import data from "./HSN_SAC.json" assert { type: "json" };

//Selection of DOM elements
const invoiceNoS = document.querySelector("#invoiceNo");
const yearS = document.querySelector("#year");
const datedS = document.querySelector("#dated");
const iNoS = document.querySelector("#iNo");
const yeS = document.querySelector("#ye");
const datS = document.querySelector("#dat");
const bNameS = document.querySelector("#bNAme");
const bAddressS = document.querySelector("#bAddress");
const bStateAndCodeS = document.querySelector("#bStateAndCode");
const bGSTS = document.querySelector("#bGST");
const buyerNameS = document.querySelector("#buyerName");
const buyerAddressS = document.querySelector("#buyerAddress");
const buyerStateAndCodeS = document.querySelector("#buyerStateAndCode");
const buyerGSTS = document.querySelector("#buyerGST");
const srNoS = document.querySelector("#srNo");
const itemDescriptionS = document.querySelector("#description");
const itemCodeS = document.querySelector("#hsnCode");
const quantityS = document.querySelector("#quantity");
const rateS = document.querySelector("#rate");
const taxableValueS = document.querySelector("#taxableValue");
const cTaxPercentS = document.querySelector("#cTaxPercent");
const cTaxAmountS = document.querySelector("#cTaxAmount");
const sTaxPercentS = document.querySelector("#sTaxPercent");
const sTaxAmountS = document.querySelector("#sTaxAmount");
const totalQuantityS = document.querySelector("#totalQuantity");
const totalTaxableValueS = document.querySelector("#totalTaxableValue");
const totalCTaxAmountS = document.querySelector("#totalCTaxAmount");
const totalSTaxAmountS = document.querySelector("#totalSTaxAmount");
const ttvS = document.querySelector("#ttv");
const tcgS = document.querySelector("#tcg");
const tsgS = document.querySelector("#tsg");
const grandTotalS = document.querySelector("#grandTotal");
const wordsS = document.querySelector("#words");
const rupeesInWordsS = document.querySelector("#rupeesInWords");
const table = document.querySelector(".table");
const totalRow = document.querySelector("#totalRow");
const addGeneralDetailsButton = document.querySelector("#addGeneralDetails");
const addBuyerDetailsButton = document.querySelector("#addBuyerDetails");
const addButton = document.querySelector("#add");
const insertButton = document.querySelector("#insert");
const generatePDFButton = document.querySelector("#generate-pdf");

let formHasGeneralDetails = false;
let formHasBuyerDetails = false;
let formHasRupeesInWords = false;

//Code for Searching Description from HSN / SAC Code
const hsn_sac = [...data.HSN, ...data.SAC];

itemCodeS.addEventListener("change", function (e) {
  e.preventDefault();

  const itemCode = itemCodeS.value;

  if (!itemCode) {
    return;
  }

  const found = hsn_sac.filter(
    (obj) => obj["SAC Code"] == itemCode || obj["HSN Code"] == itemCode
  )[0];

  if (found) {
    const itemDescription =
      found["HSN Description"] || found["SAC Description"];

    itemDescriptionS.value = itemDescription;
  }
});

//Code For Calculating taxableAmount, cTaxAmount and sTaxAmount
let taxableValue, cTaxAmount, sTaxAmount;

rateS.addEventListener("change", function () {
  const quantity = quantityS.value || 1;
  const rate = rateS.value;

  taxableValue = quantity * rate;
  taxableValueS.value = taxableValue.toFixed(2);
});

quantityS.addEventListener("change", function () {
  const quantity = quantityS.value || 1;
  const rate = rateS.value;

  taxableValue = quantity * rate;
  taxableValueS.value = taxableValue.toFixed(2);
});

cTaxPercentS.addEventListener("change", function () {
  const cTaxPercent = cTaxPercentS.value;
  const cTaxAmount = (taxableValue * cTaxPercent) / 100;

  cTaxAmountS.value = cTaxAmount.toFixed(2);
});

sTaxPercentS.addEventListener("change", function () {
  const sTaxPercent = sTaxPercentS.value;
  const sTaxAmount = (taxableValue * sTaxPercent) / 100;

  sTaxAmountS.value = sTaxAmount.toFixed(2);
});

//Code for Adding General Deatils
addGeneralDetailsButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (!invoiceNoS.value || !yearS.value || !datedS.value) {
    alert(
      "General details fields cannot be empty. Please fill all the general details."
    );
    return;
  }

  iNoS.textContent = invoiceNoS.value;
  yeS.textContent = yearS.value;
  datS.textContent = datedS.value;

  invoiceNoS.value = "";
  yearS.value = "";
  datedS.value = "";

  formHasGeneralDetails = true;
});

//Code for Adding Buyer Details
addBuyerDetailsButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    !bNameS.value ||
    !bAddressS.value ||
    !bStateAndCodeS.value ||
    !bGSTS.value
  ) {
    alert(
      "Buyer's details fields cannot be empty. Please fill all the buyer details."
    );
    return;
  }

  buyerNameS.textContent = bNameS.value;
  buyerAddressS.textContent = bAddressS.value;
  buyerStateAndCodeS.textContent = bStateAndCodeS.value;
  buyerGSTS.textContent = bGSTS.value;

  bNameS.value = "";
  bAddressS.value = "";
  bStateAndCodeS.value = "";
  bGSTS.value = "";

  formHasBuyerDetails = true;
});

//Code to Insert New Record in the table
addButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    !itemDescriptionS.value ||
    !itemCodeS.value ||
    !rateS.value ||
    !quantityS.value ||
    !taxableValueS.value ||
    !cTaxPercentS.value ||
    !cTaxAmountS.value ||
    !sTaxPercentS.value ||
    !sTaxAmountS.value
  ) {
    alert(
      "Item detail fields cannot be empty. Please fill all the item fields before adding item."
    );
    return;
  }

  const newRow = document.createElement("tr");

  const srNo = document.createElement("td");
  srNo.textContent = srNoS.value;
  srNo.classList.add("center");
  newRow.appendChild(srNo);

  const description = document.createElement("td");
  description.textContent = itemDescriptionS.value;
  newRow.appendChild(description);

  const hsn = document.createElement("td");
  hsn.textContent = itemCodeS.value;
  hsn.classList.add("center");
  newRow.appendChild(hsn);

  const rate = document.createElement("td");
  rate.textContent = rateS.value;
  rate.classList.add("center");
  newRow.appendChild(rate);

  const quantity = document.createElement("td");
  quantity.textContent = quantityS.value;
  quantity.classList.add("quantity", "center");
  newRow.appendChild(quantity);

  const tValue = document.createElement("td");
  tValue.textContent = `Rs. ${taxableValueS.value}`;
  tValue.classList.add("tvalue", "center");
  newRow.appendChild(tValue);

  const percentCT = document.createElement("td");
  percentCT.textContent = `${cTaxPercentS.value}%`;
  percentCT.classList.add("center");
  newRow.appendChild(percentCT);

  const amountCT = document.createElement("td");
  amountCT.textContent = `Rs. ${cTaxAmountS.value}`;
  amountCT.classList.add("amountCT", "center");
  newRow.appendChild(amountCT);

  const percentST = document.createElement("td");
  percentST.textContent = `${sTaxPercentS.value}%`;
  percentST.classList.add("center");
  newRow.appendChild(percentST);

  const amountST = document.createElement("td");
  amountST.textContent = `Rs. ${sTaxAmountS.value}`;
  amountST.classList.add("amountST", "center");
  newRow.appendChild(amountST);

  totalRow.parentNode.insertBefore(newRow, totalRow);

  //Clear All Input Fields
  srNoS.value = "";
  itemDescriptionS.value = "";
  itemCodeS.value = "";
  rateS.value = "";
  quantityS.value = "";
  taxableValueS.value = "";
  cTaxPercentS.value = "";
  cTaxAmountS.value = "";
  sTaxPercentS.value = "";
  sTaxAmountS.value = "";

  //Code to calculate Totals

  //Code to Calculate Total Quantity
  const quantities = document.querySelectorAll(".quantity");
  let totalQuantity = 0;

  for (let i = 0; i < quantities.length; i++) {
    totalQuantity += Number(quantities[i].innerText);
  }

  totalQuantityS.textContent = totalQuantity;

  //Code to Calculate Total Taxable Value
  const tValues = document.querySelectorAll(".tvalue");
  let totalTaxableValue = 0;

  for (let i = 0; i < tValues.length; i++) {
    totalTaxableValue += Number(tValues[i].innerText.split(" ")[1]);
  }

  totalTaxableValueS.textContent = Math.round(totalTaxableValue);
  ttvS.textContent = Math.round(totalTaxableValue);

  //Code to Calculate Total Central Tax Amount
  const amountCTs = document.querySelectorAll(".amountCT");
  let totalCTaxAmount = 0;

  for (let i = 0; i < amountCTs.length; i++) {
    totalCTaxAmount += Number(amountCTs[i].innerText.split(" ")[1]);
  }

  totalCTaxAmountS.textContent = Math.round(totalCTaxAmount);
  tcgS.textContent = Math.round(totalCTaxAmount);

  //Code to Calculate Total State Tax Amount
  const amountSTs = document.querySelectorAll(".amountST");
  let totalSTaxAmount = 0;

  for (let i = 0; i < amountSTs.length; i++) {
    totalSTaxAmount += Number(amountSTs[i].innerText.split(" ")[1]);
  }

  totalSTaxAmountS.textContent = Math.round(totalSTaxAmount);
  tsgS.textContent = Math.round(totalSTaxAmount);

  //Code for calculating Grand Total
  const grandTotal =
    Math.round(totalTaxableValue) +
    Math.round(totalCTaxAmount) +
    Math.round(totalSTaxAmount);

  grandTotalS.textContent = grandTotal;
});

//Code to Generate PDF
generatePDFButton.addEventListener("click", function () {
  if (!formHasGeneralDetails || !formHasBuyerDetails || !formHasRupeesInWords) {
    alert(
      "Fill the General Details and Buyer Details. If Filled, check whether you have filled the Rupees in Words Data."
    );
    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.text("Tax Invoice", 90, 7);

  doc.html(table, {
    callback: function (doc) {
      // Save the PDF
      doc.save("sample-document.pdf");
    },
    x: 15,
    y: 10,
    width: 210, //target width in the PDF document
    windowWidth: 900, //window width in CSS pixels
  });
});

//Code to Insert Rupees in Words
insertButton.addEventListener("click", function (e) {
  e.preventDefault();

  window.confirm(
    `Are you sure you want to insert "${wordsS.value}". Read that again and if yes, then click "OK", otherwise click "Cancel"`
  );
  rupeesInWordsS.textContent = wordsS.value;
  wordsS.value = "";

  formHasRupeesInWords = true;
});
