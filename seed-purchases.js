/**
 * Seed Script: seed-purchases.js
 * 
 * This script inserts the 10 real purchase records from the screenshots directly into the POS system database 
 * via the backend API.
 * 
 * To run this script:
 * 1. Open the POS app in your browser and log in.
 * 2. Open the browser console (Right click -> Inspect -> Console) and copy the auth token:
 *    console.log(localStorage.getItem("hal_pos_token"));
 * 3. Run the script using Node.js:
 *    node seed-purchases.js
 */

import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const purchasesToSeed = [
  {
    date: "2026-06-17T15:50:39.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Ordered",
    total: 1200.00,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "Replacement Receiver\nHannelie Du Plessis\nPT paying on collection"
  },
  {
    date: "2026-06-17T14:52:56.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 55800.00,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "Patient to pay via EFT"
  },
  {
    date: "2026-06-17T14:20:50.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 0.00,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "Mrs Yvonne Gagodelis - Pending medical aid payment of R37 880 - patient to pay balance of R1 120 on fitment"
  },
  {
    date: "2026-06-17T13:30:16.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 0.00,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: ""
  },
  {
    date: "2026-06-17T13:07:43.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Ordered",
    total: 1470.84,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "LAB STOCK"
  },
  {
    date: "2026-06-17T13:02:00.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 0.00,
    paid: 0.00,
    paymentStatus: "Paid",
    notes: "GEMS DEAL; GEMS SCREENSHOT TO BE ATTACHED\nPT portion in Cash - Received\nJohannes Van Rheeder\nInterton Spark 460 in Silver\nHP3 receiver (Bilat)\nCharger"
  },
  {
    date: "2026-06-17T13:02:00.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 0.00,
    paid: 0.00,
    paymentStatus: "Paid",
    notes: "GEMS DEAL; GEMS SCREENSHOT TO BE ATTACHED\nPT portion in Cash - Received\nJohannes Van Rheeder\nInterton Spark 460 in Silver\nHP3 receiver (Bilat)\nCharger"
  },
  {
    date: "2026-06-17T13:00:22.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 0.00,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "Medical aid claim and patient to pay shortfall\nOrdering Bronze as per Sundeep's approval"
  },
  {
    date: "2026-06-17T12:22:49.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Preordered",
    total: 0.00,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "GEMS FILE - PRE AUTH ATTACHED TO POS\nSUNDEEP TO BUILD ITE'S\nIMPRESSIONS STILL TO BE TAKEN.\nORDER FOR MRS CHRISTINA DE WET"
  },
  {
    date: "2026-06-17T11:57:40.000Z",
    supplier: "Hearing Aid Labs - HEAD OFFICE",
    status: "Ordered",
    total: 194.94,
    paid: 0.00,
    paymentStatus: "Pending",
    notes: "LABSTOCK"
  }
];

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("=========================================");
  console.log("  HAL POS - 10 Real Purchases Data Seeder  ");
  console.log("=========================================\n");

  const defaultApiUrl = "http://localhost:5022";
  let apiUrl = await askQuestion(`Enter backend API Base URL [default: ${defaultApiUrl}]: `);
  if (!apiUrl.trim()) {
    apiUrl = defaultApiUrl;
  }
  // Trim trailing slash
  apiUrl = apiUrl.replace(/\/$/, "");

  const token = await askQuestion("Enter your JWT token: ");
  if (!token.trim()) {
    console.error("Error: Token is required to authenticate API calls.");
    rl.close();
    return;
  }

  const defaultWarehouse = "HEAD OFFICE";
  console.log("\nStarting seed process...\n");

  for (let i = 0; i < purchasesToSeed.length; i++) {
    const purchase = purchasesToSeed[i];
    console.log(`[${i + 1}/10] Seeding purchase (Total: ZAR ${purchase.total})...`);

    // Create Purchase payload
    const purchasePayload = {
      date: purchase.date,
      supplier: purchase.supplier,
      supplierPhone: null,
      warehouse: defaultWarehouse,
      purchaseStatus: purchase.status,
      paymentStatus: purchase.paymentStatus,
      notes: purchase.notes || null,
      items: [
        {
          name: purchase.total > 0 ? "Hearing Aid Order / Parts" : "Stock Adjustment / Free Item",
          qty: 1,
          unitCost: purchase.total,
          tax: 0.0
        }
      ]
    };

    try {
      // Create Purchase
      const createRes = await fetch(`${apiUrl}/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(purchasePayload)
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`Failed to create purchase: ${createRes.status} - ${errText}`);
      }

      const createData = await createRes.json();
      const purchaseId = createData.id;
      const ref = createData.reference || `PO-${purchaseId}`;
      console.log(`   └─ Success: Created Purchase ID ${purchaseId} (Ref: ${ref})`);

    } catch (error) {
      console.error(`   └─ Error: ${error.message}`);
    }
    console.log("");
  }

  console.log("Seeding process completed!");
  rl.close();
}

main();
