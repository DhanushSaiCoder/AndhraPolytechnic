## Plan for Syllabus Data Representation and Display

**1. Data Structure (JSON)**

The syllabus data will be stored in a JSON file (e.g., `frontend/src/data/syllabusData.json`). This allows for a clear, hierarchical, and easily maintainable structure.

```json
{
  "curricula": [
    {
      "id": "c20",
      "code": "C-20",
      "start_year": 2020,
      "end_year": 2022,
      "branches": [
        {
          "id": "cse",
          "name": "Computer Science Engineering (CSE)",
          "code": "CSE",
          "semesters": [
            {
              "id": "cse-1yr",
              "name": "First Year",
              "code": "1YR",
              "subjects": [
                {
                  "id": "cse-em1-c20",
                  "name": "Engineering Mathematics",
                  "code": "EM1",
                  "description": "...",
                  "syllabus_pdf": "/assets/syllabus/c20/cse/1yr/em1.pdf",
                  "version": "2024-08-01",
                  "last_updated": "2024-08-01"
                },
                {
                  "id": "cse-ep1-c20",
                  "name": "Engineering Physics",
                  "code": "EP1",
                  "description": "...",
                  "syllabus_pdf": "/assets/syllabus/c20/cse/1yr/ep1.pdf",
                  "version": "2024-08-01",
                  "last_updated": "2024-08-01"
                }
                // ... more subjects
              ]
            },
            {
              "id": "cse-3sem",
              "name": "III Semester",
              "code": "3SEM",
              "subjects": [
                {
                  "id": "cse-ds-c20",
                  "name": "Data Structures",
                  "code": "DS",
                  "description": "...",
                  "syllabus_pdf": "/assets/syllabus/c20/cse/3sem/ds.pdf",
                  "version": "2024-08-01",
                  "last_updated": "2024-08-01"
                }
                // ... more subjects
              ]
            }
            // ... more semesters
          ]
        }
      ]
    },
    {
      "id": "c23",
      "code": "C-23",
      "start_year": 2023,
      "end_year": 2025,
      "branches": [
        {
          "id": "cse",
          "name": "Computer Science Engineering (CSE)",
          "code": "CSE",
          "semesters": [
            {
              "id": "cse-1yr",
              "name": "First Year",
              "code": "1YR",
              "subjects": [
                {
                  "id": "cse-em1-c23",
                  "name": "Engineering Mathematics",
                  "code": "EM1",
                  "description": "...",
                  "syllabus_pdf": "/assets/syllabus/c23/cse/1yr/em1.pdf",
                  "version": "2024-08-01",
                  "last_updated": "2024-08-01"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**Rationale:**
- **Hierarchical:** Clearly organizes data by curriculum, then by branch, then by semester, then by subject.
- **Scalable:** Easy to add new curricula, branches, semesters, or subjects without changing the core structure.
- **Readable:** JSON is human-readable and widely supported.
- **Stable IDs & Versioning:** `id` fields provide unique identifiers for each entry, crucial for updates and removals. `version` and `last_updated` can help manage caching and history.
- **Curriculum-Specific File Paths:** `syllabus_pdf` will store relative paths to PDF files, now including the curriculum code (e.g., `/assets/syllabus/c20/...`), which will be served statically.

**2. UI/UX Design (SyllabusSection.js)**

The `SyllabusSection.js` component will be responsible for displaying this data.

**Key Features:**
- **Curriculum Selection:** A top-level dropdown or tab interface to select the desired curriculum (e.g., C-20, C-23).
- **Branch Selection:** A dropdown or tab interface to select the desired branch, filtered by the selected curriculum.
- **Semester Navigation:** Once a branch is selected, display semesters as tabs, a dropdown, or a list, filtered by the selected curriculum and branch.
- **Subject List:** For the selected curriculum, branch, and semester, list all subjects.
- **Syllabus Download/View:** Each subject will have a link or button to view/download its corresponding PDF syllabus.

**Modern UI Elements & Accessibility:**
- **Dropdowns/Selects:** For curriculum, branch, and semester selection (if not using tabs).
- **Tabs:** For semester navigation within a selected branch. Use `role="tablist"`, `role="tab"`, and `aria-selected` for accessibility.
- **Cards/Accordions:** To display individual subjects, potentially with a brief description and a download link. Use `aria-labelledby` for proper labeling.
- **Responsive Design:** Ensure the layout adapts well to different screen sizes.
- **Keyboard Navigation:** Ensure all interactive elements (tabs, buttons, dropdowns) are keyboard-navigable.

**3. Implementation Steps:**

1.  **Update `syllabusData.json`:** Restructure the existing JSON file to include the `curricula` top-level array, and add `id`, `version`, and `last_updated` fields to subjects.
2.  **Update `SyllabusSection.js`:**
    *   Import `syllabusData.json`.
    *   Implement state management for selected curriculum, branch, and semester.
    *   Render UI elements for curriculum, branch, and semester selection, ensuring proper ARIA roles and keyboard accessibility.
    *   Dynamically render subjects based on the selected curriculum, branch, and semester.
    *   Add links/buttons to syllabus PDFs.
    *   **Graceful PDF Handling:** Implement logic to check for `syllabus_pdf` existence. If a PDF path is wrong or missing, disable the download button and/or display a "PDF missing" message. Use `window.open(url, "_blank", "noopener,noreferrer")` for opening PDFs in a new tab.
    *   **Defaulting:** Default to the latest curriculum (or the first one in the list if no specific logic is applied).
    *   **Missing Entries:** Display a "Not available in selected curriculum/branch/semester" message if no data is found.
3.  **Asset Management:** Ensure syllabus PDF files are placed in a publicly accessible directory (e.g., `frontend/public/assets/syllabus/c20/...`, `frontend/public/assets/syllabus/c23/...`) and their paths are correctly referenced in `syllabusData.json`.

**4. Future Considerations:**

-   **JSON Schema/Runtime Validation:** Consider adding a JSON schema or runtime validation (e.g., using Zod or Yup) to ensure data integrity, especially if the JSON is manually edited or uploaded.
-   **Search/Filter:** Add functionality to search for subjects across curricula, branches, and semesters.
-   **Admin Interface:** If needed, consider an admin interface for managing syllabus data (adding/editing/deleting curricula, branches, semesters, subjects, and uploading PDFs). This would likely involve a backend with authentication and secure file handling.
-   **Version Control for Syllabi:** If syllabi change frequently, consider a versioning system.
-   **Caching/Performance:** For larger datasets, implement caching, lazy-loading, and pagination for performance optimization.
-   **Embedded PDF Viewer:** If an in-app PDF viewer is desired, explore libraries like `PDF.js` with appropriate fallbacks.
-   **Testing:** Add unit tests for component behavior and E2E tests for user interactions (e.g., curriculum selection, opening a PDF, handling a missing PDF).
-   **Migration Mapping:** Optionally add `equivalent_of` or `replaced_by` fields so the admin can map old subject codes to new ones across curricula.
