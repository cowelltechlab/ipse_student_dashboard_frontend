/**
 * Utility functions for processing and validating SharePoint URLs
 */

/**
 * Decodes HTML entities in a URL string
 */
export function decodeHtmlEntities(url: string): string {
  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
  };

  let decodedUrl = url;
  Object.entries(htmlEntities).forEach(([entity, decoded]) => {
    decodedUrl = decodedUrl.replace(new RegExp(entity, 'g'), decoded);
  });

  return decodedUrl;
}

/**
 * Validates the format of a SharePoint sourcedoc GUID parameter
 */
export function isValidSourceDocGuid(sourcedoc: string): boolean {
  // Remove curly braces if present
  const cleanGuid = sourcedoc.replace(/[{}]/g, '');
  // GUID format: 8-4-4-4-12 characters (hexadecimal)
  const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return guidPattern.test(cleanGuid);
}

/**
 * Extracts and validates required SharePoint URL parameters
 */
export function validateSharePointParameters(url: string): {
  isValid: boolean;
  errors: string[];
  parameters: Record<string, string>;
} {
  const errors: string[] = [];
  const parameters: Record<string, string> = {};

  try {
    const urlObj = new URL(url);

    // Extract required parameters
    const sourcedoc = urlObj.searchParams.get('sourcedoc');
    const action = urlObj.searchParams.get('action');
    const wdAr = urlObj.searchParams.get('wdAr');

    if (!sourcedoc) {
      errors.push('Missing required parameter: sourcedoc');
    } else {
      parameters.sourcedoc = sourcedoc;
      if (!isValidSourceDocGuid(sourcedoc)) {
        errors.push('Invalid sourcedoc format - must be a valid GUID');
      }
    }

    if (!action) {
      errors.push('Missing required parameter: action');
    } else {
      parameters.action = action;
      if (action !== 'embedview') {
        errors.push('Invalid action parameter - must be "embedview" for iframe embedding');
      }
    }

    if (wdAr) {
      parameters.wdAr = wdAr;
      const aspectRatio = parseFloat(wdAr);
      if (isNaN(aspectRatio) || aspectRatio <= 0) {
        errors.push('Invalid wdAr parameter - must be a positive number');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      parameters,
    };
  } catch {
    return {
      isValid: false,
      errors: ['Invalid URL format'],
      parameters: {},
    };
  }
}

/**
 * Comprehensive SharePoint URL validation
 */
export function validateSharePointUrl(url: string): {
  isValid: boolean;
  errors: string[];
  cleanedUrl?: string;
} {
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      errors: ['URL is required and must be a string'],
    };
  }

  // Step 1: Decode HTML entities
  const decodedUrl = decodeHtmlEntities(url.trim());

  // Step 2: Basic URL structure validation
  if (!decodedUrl.startsWith('https://gtvault-my.sharepoint.com')) {
    return {
      isValid: false,
      errors: ['URL must be from gtvault-my.sharepoint.com domain'],
    };
  }

  if (!decodedUrl.includes('/Doc.aspx')) {
    return {
      isValid: false,
      errors: ['URL must be a SharePoint document link (must contain /Doc.aspx)'],
    };
  }

  // Step 3: Parameter validation
  const paramValidation = validateSharePointParameters(decodedUrl);

  if (!paramValidation.isValid) {
    return {
      isValid: false,
      errors: paramValidation.errors,
    };
  }

  return {
    isValid: true,
    errors: [],
    cleanedUrl: decodedUrl,
  };
}

/**
 * Processes a SharePoint URL by decoding entities and validating it
 */
export function processSharePointUrl(url: string): {
  isValid: boolean;
  cleanedUrl: string;
  errors: string[];
  userFriendlyError?: string;
} {
  const validation = validateSharePointUrl(url);

  if (!validation.isValid) {
    let userFriendlyError = 'Invalid SharePoint URL';

    if (validation.errors.some(err => err.includes('HTML entities'))) {
      userFriendlyError = 'Please paste the URL directly from SharePoint, not from HTML source code';
    } else if (validation.errors.some(err => err.includes('domain'))) {
      userFriendlyError = 'URL must be from Georgia Tech\'s SharePoint (gtvault-my.sharepoint.com)';
    } else if (validation.errors.some(err => err.includes('Doc.aspx'))) {
      userFriendlyError = 'Please use a SharePoint document embed URL';
    } else if (validation.errors.some(err => err.includes('sourcedoc'))) {
      userFriendlyError = 'URL is missing required document information';
    } else if (validation.errors.some(err => err.includes('action'))) {
      userFriendlyError = 'URL must be an embed link (action=embedview)';
    }

    return {
      isValid: false,
      cleanedUrl: url,
      errors: validation.errors,
      userFriendlyError,
    };
  }

  return {
    isValid: true,
    cleanedUrl: validation.cleanedUrl!,
    errors: [],
  };
}