/**
 * Seed Script: seed-sales.js
 * 
 * This script inserts the 10 real sales records from the screenshots directly into the POS system database 
 * via the backend API.
 * 
 * To run this script:
 * 1. Open the POS app in your browser and log in.
 * 2. Open the browser console (Right click -> Inspect -> Console) and copy the auth token:
 *    console.log(localStorage.getItem("hal_pos_token"));
 * 3. Run the script using Node.js:
 *    node seed-sales.js
 */

import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const salesToSeed = [
  {
    date: "2026-06-17T16:54:29.000Z",
    biller: "Hearing Aid Lab Musgrave (Pty) Ltd",
    customerName: "Walk in Walk in",
    customerPhone: "0312017006",
    source: "Unknown",
    total: 50.00,
    paid: 50.00
  },
  {
    date: "2026-06-17T16:50:51.000Z",
    biller: "Hearing Aid Lab Centurion (Pty) Ltd",
    customerName: "Hester Van Den Heever",
    customerPhone: "0829325558",
    source: "Walk Up",
    total: 150.00,
    paid: 150.00
  },
  {
    date: "2026-06-17T16:50:24.000Z",
    biller: "Hearing Aid Lab Scottburgh (Pty) Ltd",
    customerName: "Desmond Shaw",
    customerPhone: "0780475977",
    source: "Shop window",
    total: 80.00,
    paid: 80.00
  },
  {
    date: "2026-06-17T16:49:44.000Z",
    biller: "Hearing Aid Lab Scottburgh (Pty) Ltd",
    customerName: "Maria Retief",
    customerPhone: "0824535781",
    source: "Shop window",
    total: 50.00,
    paid: 50.00
  },
  {
    date: "2026-06-17T16:49:15.000Z",
    biller: "Hearing Aid Lab Scottburgh (Pty) Ltd",
    customerName: "Isaac Ndlela",
    customerPhone: "0736055994",
    source: "Unknown",
    total: 30.00,
    paid: 30.00
  },
  {
    date: "2026-06-17T16:44:22.000Z",
    biller: "Hearing Aid Lab Hillcrest (Pty) Ltd",
    customerName: "Kevin Connoly",
    customerPhone: "0826532069",
    source: "online",
    total: 49000.00,
    paid: 0.00
  },
  {
    date: "2026-06-17T16:38:00.000Z",
    biller: "HEARING AID LAB SOMERSET WEST (Pty) Ltd",
    customerName: "David Glass",
    customerPhone: "0825542386",
    source: "Shop window",
    total: 25000.00,
    paid: 0.00
  },
  {
    date: "2026-06-17T16:37:21.000Z",
    biller: "Hearing Aid Lab Musgrave (Pty) Ltd",
    customerName: "Nikitha Qomiyana",
    customerPhone: "0836527715",
    source: "Shop window",
    total: 1391.50,
    paid: 0.00
  },
  {
    date: "2026-06-17T16:35:05.000Z",
    biller: "HEARING AID LAB BRACKENFELL",
    customerName: "Antoinette Van Der Walt",
    customerPhone: "0764051908",
    source: "Promotion",
    total: 0.00,
    paid: 0.00
  },
  {
    date: "2026-06-17T16:35:04.000Z",
    biller: "HEARING AID LABS LA LUCIA",
    customerName: "Renuka Namulall",
    customerPhone: "0722263678",
    source: "Walk Up",
    total: 0.00,
    paid: 0.00
  }
];

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("=========================================");
  console.log("   HAL POS - 10 Real Sales Data Seeder   ");
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

  for (let i = 0; i < salesToSeed.length; i++) {
    const sale = salesToSeed[i];
    console.log(`[${i + 1}/10] Seeding sale for ${sale.customerName} (Total: ZAR ${sale.total})...`);

    // 1. Create Sale payload
    const salePayload = {
      date: sale.date,
      warehouse: defaultWarehouse,
      customerName: sale.customerName,
      customerPhone: sale.customerPhone,
      biller: sale.biller,
      discount: 0.0,
      backorderNotes: sale.source !== "Unknown" ? `Source: ${sale.source}` : null,
      items: [
        {
          name: sale.total > 0 ? "General Product / Service" : "Promotion Free Item",
          qty: 1,
          unitCost: sale.total,
          discount: 0.0,
          tax: 0.0
        }
      ]
    };

    try {
      // Create Sale
      const createRes = await fetch(`${apiUrl}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(salePayload)
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`Failed to create sale: ${createRes.status} - ${errText}`);
      }

      const createData = await createRes.json();
      const saleId = createData.id;
      const ref = createData.reference || `SALE-${saleId}`;
      console.log(`   └─ Success: Created Sale ID ${saleId} (Ref: ${ref})`);

      // 2. Register Payment if paid > 0
      if (sale.paid > 0) {
        console.log(`   └─ Registering payment of ZAR ${sale.paid}...`);
        const paymentPayload = {
          amount: sale.paid,
          paidBy: "Cash",
          note: "Initial paid seeding"
        };

        const payRes = await fetch(`${apiUrl}/sales/${saleId}/payments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(paymentPayload)
        });

        if (!payRes.ok) {
          const errText = await payRes.text();
          console.error(`   └─ Warning: Failed to register payment: ${payRes.status} - ${errText}`);
        } else {
          console.log(`   └─ Success: Payment registered`);
        }
      }
    } catch (error) {
      console.error(`   └─ Error: ${error.message}`);
    }
    console.log("");
  }

  console.log("Seeding process completed!");
  rl.close();
}

main();
