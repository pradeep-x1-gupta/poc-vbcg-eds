/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-allergy-care-guide.js
  var import_allergy_care_guide_exports = {};
  __export(import_allergy_care_guide_exports, {
    default: () => import_allergy_care_guide_default
  });

  // tools/importer/parsers/guide-nav.js
  function parse(element, { document }) {
    const links = [...element.querySelectorAll("a")];
    const container = document.createElement("div");
    links.forEach((a) => {
      const p = document.createElement("p");
      p.append(a);
      container.append(p);
    });
    const cells = [
      ["Guide Nav"],
      [container]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/care-guide.js
  function parse2(element, { document }) {
    var _a;
    const title = ((_a = element.querySelector("h2")) == null ? void 0 : _a.textContent.trim()) || "";
    const quick = element.querySelector(".quick-guide");
    const referral = element.querySelector(".referral-guidelines");
    const comms = element.querySelector(".patient-communication");
    const quickCell = document.createElement("div");
    if (quick) {
      while (quick.firstChild) quickCell.append(quick.firstChild);
    }
    const referralCell = document.createElement("div");
    if (referral) {
      while (referral.firstChild) referralCell.append(referral.firstChild);
    }
    const commsCell = document.createElement("div");
    if (comms) {
      while (comms.firstChild) commsCell.append(comms.firstChild);
    }
    const cells = [
      ["Care Guide"],
      [title],
      [quickCell, referralCell],
      [commsCell]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/transformers/cleanup.js
  function transform(hookName, element, payload) {
    if (hookName !== "beforeTransform") return;
    const { document } = payload;
    WebImporter.DOMUtils.remove(element, [
      "header",
      "footer",
      "script",
      "style",
      "noscript"
    ]);
  }

  // tools/importer/import-allergy-care-guide.js
  var parsers = {
    "guide-nav": parse,
    "care-guide": parse2
  };
  var PAGE_TEMPLATE = {
    name: "allergy-care-guide",
    description: "Allergy Care Guide \u2014 jump nav plus stacked clinical guide cards",
    urls: [
      "https://www.risanthealth.org/allergy-care-guide"
    ],
    blocks: [
      {
        name: "guide-nav",
        instances: [".guide-jump-nav"]
      },
      {
        name: "care-guide",
        instances: [".care-guide-card"]
      }
    ]
  };
  var transformers = [
    transform
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_allergy_care_guide_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_allergy_care_guide_exports);
})();
