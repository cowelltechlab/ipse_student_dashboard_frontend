# Backend Fix: HTML-to-Word List Duplication and Nesting

## Problem
The `convert_html_to_word_bytes` function has a critical bug on **line 53** that causes:
1. **Duplication**: List items appearing 2-3 times in Word documents
2. **Incorrect nesting**: All items showing as `1,2,3,4,5` instead of `1, a,b,c`
3. **Text concatenation**: Parent items containing all child items' text

## Root Cause
```python
for i, li in enumerate(element.find_all('li')):
```

`find_all('li')` recursively finds ALL `<li>` elements including nested ones, causing:
- Parent list processes all 4 `<li>` elements (including children)
- Then nested `<ol>` processes the same 3 child elements again
- Result: 3x duplication

## Solution

### Replace lines 42-68 in `convert_html_to_word_bytes` function:

```python
elif element.name in ['ul', 'ol']:
    # Process lists recursively with proper nesting
    def process_list(list_element, level=0):
        """
        Recursively process nested lists with proper indentation and numbering.

        Args:
            list_element: The <ul> or <ol> BeautifulSoup element
            level: Current nesting level (0 = top level)
        """
        # Process only DIRECT children li elements (not nested ones)
        for child in list_element.find_all('li', recursive=False):
            # Extract text content, excluding nested lists
            text_parts = []
            for content in child.children:
                if isinstance(content, str):
                    # Direct text content
                    text_parts.append(content.strip())
                elif hasattr(content, 'name') and content.name not in ['ul', 'ol']:
                    # Inline elements (strong, em, etc.) but NOT nested lists
                    text_parts.append(content.get_text().strip())

            text = ' '.join(text_parts).strip()

            if text:
                # Determine list style based on type and level
                is_numbered = list_element.name == 'ol'

                if is_numbered:
                    # Level 0: 1, 2, 3...  Level 1: a, b, c...  Level 2+: i, ii, iii...
                    style = 'List Number' if level == 0 else 'List Number 2'
                else:
                    # Bullet lists
                    style = 'List Bullet' if level == 0 else 'List Bullet 2'

                paragraph = doc.add_paragraph(text, style=style)

                # Add indentation for nested levels
                if level > 0:
                    from docx.shared import Inches
                    paragraph.paragraph_format.left_indent = Inches(0.5 * level)

            # Recursively process any nested lists within this <li>
            for nested_list in child.find_all(['ul', 'ol'], recursive=False):
                process_list(nested_list, level + 1)

    # Start processing from top level
    process_list(element)
```

### Key Changes:
1. **Line 53**: Changed `find_all('li')` to `find_all('li', recursive=False)` - only direct children
2. **Text extraction**: Explicitly excludes nested `<ul>` and `<ol>` from text content
3. **Recursive processing**: Separate handling for nested lists with proper level tracking
4. **Proper styling**: Uses Word's "List Number 2" style for nested lists (gives a,b,c formatting)
5. **Indentation**: Adds proper indentation for nested levels

### Import Addition (if not already present):
Add at the top of the file with other imports:
```python
from docx.shared import Inches
```

## Expected Results

### Before Fix:
```
Step by Step Plan
• Check Canvas...Read the material...Attend class...Complete quizzes
1. Read the material 📖
2. Attend class 👥
3. Complete quizzes 📈
• Read the material 📖
4. Attend class 👥
5. Complete quizzes 📈
```

### After Fix:
```
Step by Step Plan
1. Check Canvas for readings 📅
   a. Read the material 📖
   b. Attend class 👥
   c. Complete quizzes 📈
```

## Testing

1. Save an assignment with nested lists in the frontend
2. Download the Word document
3. Verify:
   - No duplicate items
   - Proper nesting with correct numbering (1, a, b, c)
   - Parent items don't contain child text
   - Indentation matches visual hierarchy

## Alternative: If Word Styles Don't Support Letter Numbering

If "List Number 2" doesn't automatically use letter numbering in your Word template, you can manually set the numbering format:

```python
if level == 1:
    # Force letter numbering for level 1
    paragraph._element.get_or_add_pPr().get_or_add_numPr().get_or_add_numFmt().val = 'lowerLetter'
```

## Files to Modify
- Backend Python file containing `convert_html_to_word_bytes` function
- Likely in a file named something like:
  - `document_utils.py`
  - `word_converter.py`
  - `assignment_utils.py`
  - Or wherever the download endpoint utilities are defined
