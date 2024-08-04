const getElementsWithText = () => {
  const elementsWithinBody = Array.from(document.querySelectorAll('body *'));
  return elementsWithinBody.filter((element) => element.childElementCount === 0 && element.textContent.trim() !== '');
};

function updateElementsTextContent(elements) {
  elements.forEach((element, idx) => {
    element.textContent = sessionStorage.getItem(String(idx)) ?? element.textContent;
  });
}

function enableContentEditable(elements) {
  elements.forEach((element) => {
    element.contentEditable = 'true';
  });
}

function setEventListeners(elements) {
  elements.forEach((element, idx) => {
    element.addEventListener('input', (event) => {
      const text = event.target.textContent;
      text ? sessionStorage.setItem(idx, event.target.textContent) : sessionStorage.removeItem(idx);
    });

    element.addEventListener('blur', () => {
      element.classList.add('animate');
    });

    element.addEventListener('animationend', () => {
      element.classList.remove('animate');
    });
  });
}

const initializeEditableElements = () => {
  const elementsWithText = getElementsWithText();
  updateElementsTextContent(elementsWithText);
  enableContentEditable(elementsWithText);
  setEventListeners(elementsWithText);
};

function initializeDownloadButton() {
  const container = document.getElementById('content');
  const downloadButton = document.getElementById('download-button');
  downloadButton.contentEditable = 'false';
  downloadButton.addEventListener('click', () => {
    html2pdf().from(container).set({filename: 'resume.pdf'}).save();
  });
}

window.addEventListener('load', () => {
  initializeEditableElements();
  initializeDownloadButton();
});
