"use client";
import { Button, Card, List, message, Spin } from "antd";
import { useState, useEffect } from "react";

export default function BrandDocumentation() {
  const [brandReady, setBrandReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Check if brand is ready for documentation
  const checkBrandReady = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const response = await fetch("http://localhost:8000/api/brand-ready/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setBrandReady(data.brand_documentation_ready);

      // Generate PDF immediately if brand is ready
      if (data.brand_documentation_ready) {
        generateBusinessSummary();
      }
    } catch (error) {
      console.error("Error checking brand readiness:", error);
      message.error("Failed to check brand status");
    } finally {
      setLoading(false);
    }
  };

  // Generate business summary PDF
  const generateBusinessSummary = async () => {
    setGeneratingPdf(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const response = await fetch("http://localhost:8000/api/generate-business-summary/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const data = await response.json();

      if (data?.pdf_url) {
        setPdfUrl(data.pdf_url);
        message.success("Brand documentation generated!");
      } else {
        throw new Error("PDF URL not found in response");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      message.error("Failed to generate documentation");
    } finally {
      setGeneratingPdf(false);
    }
  };

  // Download PDF handler
  const handleDownload = () => {
    if (!pdfUrl) return;

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "brand-documentation.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Check brand readiness on component mount
  useEffect(() => {
    checkBrandReady();
  }, []);

  // PDF display component
  const PdfViewer = () => (
    <div className="w-full h-[80vh]">
      {generatingPdf ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" tip="Generating document..." />
        </div>
      ) : pdfUrl ? (
        <>
          <iframe
            src={pdfUrl}
            className="w-full h-full border rounded-lg shadow-lg"
            title="Brand Documentation"
          />
          <div className="flex justify-end mt-4 gap-4">
            <Button type="primary" onClick={checkBrandReady}>
              Recheck Status
            </Button>
            <Button type="primary" onClick={generateBusinessSummary}>
              Regenerate
            </Button>
            <Button type="primary" onClick={handleDownload}>
              Download PDF
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">No PDF URL available.</p>
      )}
    </div>
  );

  // Incomplete brand message
  const IncompleteBrand = () => (
    <Card
      title="Complete Brand Setup"
      className="max-w-3xl mx-auto mt-10 shadow-lg"
    >
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-6">
          Your brand documentation is not ready yet
        </h2>
        <p className="mb-8 text-gray-600">
          Please complete these essential brand elements to generate your documentation:
        </p>

        <List bordered className="mb-8">
          <List.Item className="py-3">Generate Brand Name</List.Item>
          <List.Item className="py-3">Create Logo</List.Item>
          <List.Item className="py-3">Develop Slogan</List.Item>
          <List.Item className="py-3">Complete Business Overview</List.Item>
        </List>

        <Button
          type="primary"
          size="large"
          onClick={checkBrandReady}
          loading={loading}
        >
          Check Readiness Again
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      <h1>Brand Documentation</h1>
      <h3 className="text-primary text-center text-[28px] py-5">
        Generate comprehensive brand documentation with all your<br />
        brand assets and business information
      </h3>

      <div className="container mx-auto p-6">
        {loading ? (
          <div className="text-center py-20">
            <Spin size="large" tip="Checking brand status..." />
          </div>
        ) : brandReady ? (
          <PdfViewer />
        ) : (
          <IncompleteBrand />
        )}
      </div>
    </div>
  );
}
