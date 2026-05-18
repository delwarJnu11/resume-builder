/**
 * Triggers PDF export by dispatching a custom event that ResumePreview listens to.
 * ResumePreview uses react-to-print which leverages the browser's native print
 * engine — fully supports modern CSS (oklch, lab, etc.) with no canvas conversion.
 */
export function exportToPDF(_element: HTMLElement | null, _filename = 'resume.pdf'): void {
  window.dispatchEvent(new CustomEvent('resume:print'));
}
