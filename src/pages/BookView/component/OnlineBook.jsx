import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set local worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFPreview({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const maxPreviewPages = 10;
  console.log(pdfUrl);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error) {
    console.error("PDF Load Error:", error);
  }

  function changePage(offset) {
    const next = pageNumber + offset;
    if (next >= 1 && next <= Math.min(numPages, maxPreviewPages)) {
      setPageNumber(next);
    }
  }

  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-100 p-6 shadow-md">
      {numPages > maxPreviewPages && (
        <div className="mb-4 w-full rounded-md bg-yellow-100 p-3 text-center text-yellow-800">
          Preview only {maxPreviewPages} pages.
        </div>
      )}

      <Document
        // file={"/sample.pdf"}
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<p>PDF Loading...</p>}
        className={"w-[75%]"}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="mb-4 rounded bg-white p-2 shadow-md"
        />
      </Document>

      {numPages && (
        <div className="mt-4 flex w-full max-w-md items-center justify-between">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className={`rounded px-4 py-2 ${
              pageNumber <= 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev page
          </button>

          <span className="text-gray-700">
            Page {pageNumber} / {Math.min(numPages, maxPreviewPages)}
          </span>

          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= Math.min(numPages, maxPreviewPages)}
            className={`rounded px-4 py-2 ${
              pageNumber >= Math.min(numPages, maxPreviewPages)
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}
