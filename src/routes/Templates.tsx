import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'react-toastify';
import { fromKebabCase } from "../helper"
import ExternalButton from "../components/ExternalButton"

declare global {
  interface Window {
    ethicalads?: {
      load: () => void;
      wait?: Promise<any>;
    };
  }
}

const CopyButton = ({ ui, name }: { ui: 'designer' | 'form-viewer', name: string }) => {
  const handleCopy = async () => {
    const shareableUrl = `https://www.pariosolutions.com.au`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareableUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareableUrl;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        if (!document.execCommand("copy")) {
          throw new Error("Fallback: Copying text command was unsuccessful");
        }
        document.body.removeChild(textArea);
      }
      toast.info(`Copied shareable link to clipboard - "${fromKebabCase(name)}"`);
    } catch (error) {
      toast.error("Failed to copy shareable link");
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      className="rounded-md border border-transparent bg-gray-100 p-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
      onClick={handleCopy}
      aria-label="Copy shareable link"
    >
      <ClipboardCopy size={20} />
    </button>
  );
};

function TemplatesApp({ isEmbedded }: { isEmbedded: boolean }) {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState<{ name: string; author: string }[]>([]);

  useEffect(() => {
    fetch('/template-assets/index.json')
      .then((response) => response.json())
      .then((data: { name: string; author: string }[]) => {
        setTemplates(data);
      });
  }, []);

  useEffect(() => {
    if (window.ethicalads && typeof window.ethicalads.load === "function") {
      window.ethicalads.load();
    } else {
      console.warn("EthicalAds script is not loaded yet.");
    }
  }, [templates]);

  const navigateToDesigner = (name: string) => {
    if (isEmbedded) {
      window.parent.postMessage({ type: 'navigate', payload: { name, ui: 'designer' } }, '*');
    } else {
      navigate(`/?template=${name}`)
    }
  }

  const navigateToFormViewer = (name: string) => {
    if (isEmbedded) {
      window.parent.postMessage({ type: 'navigate', payload: { name, ui: 'form-viewer' } }, '*');
    } else {
      navigate(`/form-viewer?template=${name}`)
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Sample Templates</h2>
        <div className="lg:flex items-center border-b border-dashed border-gray-200 pb-2">
          <p className="mt-4 text-md text-gray-600">
            If you can’t find the template you need, you can request it from Pario's Dev team.
          </p>
          <div className="mt-4 ml-auto">
            <ExternalButton
              href="https://www.pariosolutions.com.au"
              title="Request a Template"
            />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {templates.map(({ name, author }, index) => (
            <React.Fragment key={name}>
              {index === 3 && (
                <div
                  data-ea-publisher="pariosolutions"
                  data-ea-type="image"
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                />
              )}
              <div>
                <div className="relative border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                  <div className="relative h-72 w-full overflow-hidden">
                    <img
                      onClick={() => navigateToDesigner(name)}
                      alt={fromKebabCase(name)}
                      src={`/template-assets/${name}/thumbnail.png`}
                      className="border border-gray-100 size-full object-contain cursor-pointer"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-md font-bold text-green-600">
                      {fromKebabCase(name)}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      by {author}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => navigateToDesigner(name)}
                        className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      >
                        Go to Designer
                      </button>
                      <CopyButton ui="designer" name={name} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => navigateToFormViewer(name)}
                        className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      >
                        Go to Form/Viewer
                      </button>
                      <CopyButton ui="form-viewer" name={name} />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="flex items-center justify-center">
            <div className="relative border-2 border-green-300 rounded-lg p-6 bg-green-50 shadow-md">
              <div className="relative mt-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.pariosolutions.com.au"
                  className="text-md font-extrabold text-green-700 underline decoration-green-400 hover:text-green-600 hover:decoration-green-500 transition duration-300"
                >
                  Share Your Template
                </a>
                <p className="mt-2 text-sm text-green-800 flex items-center gap-2 font-medium">
                  Share the templates you've created!
                </p>
              </div>
              <div className="mt-6">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.pariosolutions.com.au"
                  className="w-full relative flex items-center justify-center rounded-md bg-gradient-to-r from-green-400 to-green-600 px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition duration-300"
                >
                  See Template Creation Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatesApp;