document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document
    .getElementById("superstoreTable")
    .getElementsByTagName("tbody")[0];

  // Fungsi untuk memuat data JSON dari sebuah URL
  async function loadJSON(url) {
    const response = await fetch(url);
    return await response.json();
  }


  // Memuat file JSON
  const superstoreData = await loadJSON("../dataset/superstore.json");

  const maxRows = 10;
  const limitedData = superstoreData.slice(0, maxRows);

  // Memproses data dari superstore.json
  limitedData.forEach((item) => {
    const row = tableBody.insertRow();

    const cellOrderID = row.insertCell(0);
    const cellOrderDate = row.insertCell(1);
    const cellShipDate = row.insertCell(2);
    const cellShipMode = row.insertCell(3);
    const cellCustomerID = row.insertCell(4);
    const cellCustomerName = row.insertCell(5);
    const cellSegment = row.insertCell(6);
    const cellCountry = row.insertCell(7);
    const cellCity = row.insertCell(8);
    const cellState = row.insertCell(9);
    const cellPostalCode = row.insertCell(10);
    const cellRegion = row.insertCell(11);
    const cellProductID = row.insertCell(12);
    const cellCategory = row.insertCell(13);
    const cellSubCategory = row.insertCell(14);
    const cellProductName = row.insertCell(15);
    const cellSales = row.insertCell(16);
    const cellQuantity = row.insertCell(17);
    const cellDiscount = row.insertCell(18);
    const cellProfit = row.insertCell(19);

    cellOrderID.textContent = item.Order_ID;
    cellOrderDate.textContent = item.Order_Date;
    cellShipDate.textContent = item.Ship_Date;
    cellShipMode.textContent = item.Ship_Mode;
    cellCustomerID.textContent = item.Customer_ID;
    cellCustomerName.textContent = item.Customer_Name;
    cellSegment.textContent = item.Segment;
    cellCountry.textContent = item.Country;
    cellCity.textContent = item.City;
    cellState.textContent = item.State;
    cellPostalCode.textContent = item.Postal_Code;
    cellRegion.textContent = item.Region;
    cellProductID.textContent = item.Product_ID;
    cellCategory.textContent = item.Category;
    cellSubCategory.textContent = item.Sub_Category;
    cellProductName.textContent = item.Product_Name;
    cellSales.textContent = item.Sales;
    cellQuantity.textContent = item.Quantity;
    cellDiscount.textContent = item.Discount;
    cellProfit.textContent = item.Profit;
  });
});
