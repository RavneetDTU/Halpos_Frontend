import { useState, useEffect } from "react";

export function CashupListing() {
  const cashupData = [
    {
      id: 7,
      warehouse: "WARTLES",
      closeDate: "2025-06-05",
      branchSlip: "N",
      attachmentSlip: "7ec9A62b/U/sNXbM4XJqbPy9/XbZesoj",
      cashupAmount: "0",
      creditCard: "0",
    },
    {
      id: 3,
      warehouse: "LOMPOBFACH",
      closeDate: "2025-06-05",
      branchSlip: "0",
      attachmentSlip: "",
      cashupAmount: "0",
      creditCard: "0",
    },
    {
      id: 8,
      warehouse: "CAPETOWN1",
      closeDate: "2025-06-05",
      branchSlip: "1398",
      attachmentSlip: "",
      cashupAmount: "1400",
      creditCard: "0",
    },
    {
      id: 4,
      warehouse: "BLUET",
      closeDate: "2025-06-05",
      branchSlip: "1398",
      attachmentSlip: "d/Y31sVxfYa0F3E9/H/1Jx6z3h/gvxg",
      cashupAmount: "122",
      creditCard: "0",
    },
    {
      id: 9,
      warehouse: "NEWCASTLE",
      closeDate: "2025-06-05",
      branchSlip: "1398",
      attachmentSlip: "7Rc9A62b/U/sNXbM4XJqbPy9/XbZesoj",
      cashupAmount: "1335",
      creditCard: "0",
    },
    {
      id: 10,
      warehouse: "WELKOM",
      closeDate: "2025-06-05",
      branchSlip: "1398",
      attachmentSlip: "d/Ac9A62b/U/sNXbM4XJqbPy9/XbZesoj",
      cashupAmount: "1195",
      creditCard: "0",
    },
    {
      id: 11,
      warehouse: "KLEOF",
      closeDate: "2025-06-12",
      branchSlip: "1799",
      attachmentSlip: "dzx95j911j39b8911j01/1z/Yoce9P0j09",
      cashupAmount: "2550",
      creditCard: "0",
    },
    {
      id: 12,
      warehouse: "MPUMALNGA",
      closeDate: "2025-06-08",
      branchSlip: "1639",
      attachmentSlip: "cP/JYe7Yb21da20Zs11k/0Px9X71",
      cashupAmount: "0",
      creditCard: "0",
    },
    {
      id: 13,
      warehouse: "CASCADES",
      closeDate: "2025-06-10",
      branchSlip: "918",
      attachmentSlip: "1994xccUbZdh1HSHa0P4m7r723.jpg",
      cashupAmount: "3142",
      creditCard: "0",
    },
    {
      id: 14,
      warehouse: "MUSGRARE",
      closeDate: "2025-06-09",
      branchSlip: "1601",
      attachmentSlip: "a6a9f2334847121a62f489/a3a18375.png",
      cashupAmount: "125",
      creditCard: "0",
    },
  ];

  const [openActionMenu, setOpenActionMenu] = useState<
    number | null
  >(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    cashupId: number | null;
  }>({
    isOpen: false,
    cashupId: null,
  });

  const toggleActionMenu = (id: number) => {
    setOpenActionMenu((prev) => (prev === id ? null : id));
  };

  const handleDeleteClick = (id: number) => {
    setDeleteModal({
      isOpen: true,
      cashupId: id,
    });

    setOpenActionMenu(null);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted:", deleteModal.cashupId);

    setDeleteModal({
      isOpen: false,
      cashupId: null,
    });
  };

  const handleDownload = (item: any) => {
    console.log("Download:", item);
    setOpenActionMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !target.closest(".action-menu") &&
        !target.closest(".action-btn")
      ) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="rounded border border-gray-300 bg-white overflow-visible">
        <div className="border-b border-gray-200 p-4">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">
            cashup (All Warehouses)
          </h2>

          <p className="text-sm text-gray-600">
            Please use the table below to navigate or filter the
            results. You can download the table as excel and
            pdf.
          </p>
        </div>

        <div className="p-4">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                End Date
              </label>

              <input
                type="date"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center justify-end">
            <button className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">
              Search
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Show
              </span>

              <select className="rounded border border-gray-300 px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>

              <span className="text-sm text-gray-600">
                entries
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Search:
              </span>

              <input
                type="text"
                className="w-48 rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          </div>

          <div className="overflow-visible rounded border border-gray-300">
            <table className="relative w-full text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">
                    ID
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Warehouse
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Close Date
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Branch Slip Number
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Attachment Slip
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Cashup Amount
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Credit-card Amount
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {cashupData.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >
                    <td className="px-3 py-2 text-xs">
                      {item.id}
                    </td>

                    <td className="px-3 py-2 text-xs">
                      {item.warehouse}
                    </td>

                    <td className="px-3 py-2 text-xs">
                      {item.closeDate}
                    </td>

                    <td className="px-3 py-2 text-xs">
                      {item.branchSlip}
                    </td>

                    <td className="break-all px-3 py-2 text-xs text-blue-600">
                      {item.attachmentSlip}
                    </td>

                    <td className="px-3 py-2 text-xs">
                      {item.cashupAmount}
                    </td>

                    <td className="px-3 py-2 text-xs">
                      {item.creditCard}
                    </td>

                    <td className="relative overflow-visible px-3 py-2">
                      <button
                        onClick={() =>
                          toggleActionMenu(item.id)
                        }
                        className="action-btn rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      >
                        Actions
                      </button>

                      {openActionMenu === item.id && (
                        <div
                          className="
                            action-menu
                            absolute
                            right-0
                            top-full
                            mt-2
                            z-[999]
                            w-52
                            overflow-hidden
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            shadow-2xl
                          "
                        >
                          <button
                            onClick={() =>
                              handleDeleteClick(item.id)
                            }
                            className="
                              flex
                              w-full
                              items-center
                              gap-2
                              px-4
                              py-3
                              text-left
                              text-sm
                              text-gray-700
                              transition
                              hover:bg-gray-100
                            "
                          >
                            🗑️ Delete Cashup
                          </button>

                          <button
                            onClick={() => handleDownload(item)}
                            className="
                              flex
                              w-full
                              items-center
                              gap-2
                              px-4
                              py-3
                              text-left
                              text-sm
                              text-gray-700
                              transition
                              hover:bg-gray-100
                            "
                          >
                            📄 Download Slip
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to 10 of 26 entries
            </div>

            <div className="flex gap-1">
              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                Previous
              </button>

              <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
                1
              </button>

              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                2
              </button>

              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                3
              </button>

              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm overflow-hidden rounded bg-white shadow-2xl">
            <div className="border-b border-gray-200 bg-gray-100 px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Cashup
              </h2>
            </div>

            <div className="px-4 py-6">
              <p className="text-gray-700">Are you sure?</p>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  Yes I'm sure
                </button>

                <button
                  onClick={() =>
                    setDeleteModal({
                      isOpen: false,
                      cashupId: null,
                    })
                  }
                  className="bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}