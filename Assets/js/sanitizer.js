import DOMPurify from "../../node_modules/dompurify/dist/purify.es.mjs";

export function sanitizeInput(text) {
    return DOMPurify.sanitize(text);
}