import apiClient from "./apiClient";

//  For Version Generation
export const getAssignmentVersionOptions = async (assignment_id: number, from_version_doc_id?: string) => {
  const url = from_version_doc_id
    ? `/assignment-generation/${assignment_id}?from_version=${from_version_doc_id}`
    : `/assignment-generation/${assignment_id}`;

  const response = await apiClient.get(url);
  return response.data;
};

export const postAssignmentVersion = async (
  assignment_version_id: string,
  selected_options: string[],
  additional_edit_suggestions?: string
) => {
  const payload = {
    selected_options,
    additional_edit_suggestions: additional_edit_suggestions || "",
  };

  const response = await apiClient.post(
    `/assignment-generation/${assignment_version_id}`,
    payload
  );

  return response.data;
};

export const putAssignmentVersion = async (
  assignment_version_id: string,
  updated_html_content: string
) => {
  const payload = { updated_html_content };
  const response = await apiClient.put(
    `/assignment-generation/${assignment_version_id}`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data as { html_content: string };
};

// For versions vieweing
export const getDocumentByDocId = async (document_version_id: string) => {
  const response = await apiClient.get(
    `/versions/assignment/${document_version_id}`
  );

  return response.data;
};

export const postFinalizeAssignmentVersion = async (
  document_version_id: string
) => {
  const response = await apiClient.post(
    `/versions/assignment/finalize/${document_version_id}`
  );

  return response.data;
};

export const getAssignmentVersionDownload = async (document_version_id: string) => {
  const response = await apiClient.get(
    `/versions/assignment/download/${document_version_id}`,
    { responseType: 'blob' }
  );
  return response.data;
};
