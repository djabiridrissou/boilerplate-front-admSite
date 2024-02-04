import { AiOutlineSearch } from "react-icons/ai";
import { PiExportBold } from "react-icons/pi";
import { useEffect } from "react";


const DebtList = () => {
    useEffect(() => {

    }, []);

    return (
        <>
            <div className=" h-auto flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
                <h1 className="text-[14px] font-bold"></h1>

                <div className="bg-white rounded-lg p-2 border shadow-md mt-2">
                    <div className="flex justify-between mb-3">
                        <div className="flex gap-1 items-center text-[12.8px]">
                            <span>Show</span>
                            <select
                                name="limit"
                                id="limit"
                               
                                onChange={() => {}}
                                className={`text-[0.8rem] px-[8px] py-[0.2rem] border border-gray-400 rounded-[0.25rem] shadow-md placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-gray-300 focus:border-gray-500`}
                            >
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={300}>300</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <div className="flex relative w-[20%]">
                            <input
                                type="text"
                                name="search"
                                id="search"
                               
                                onChange={() => {}}
                                autoFocus
                                placeholder="Search..."
                                className={`w-full text-[0.8rem] px-[0.75rem] py-[0.2rem] border border-gray-400 rounded-md shadow-md placeholder-[#8391a2] focus:ring-[0.2px] focus:ring-gray-300 focus:border-gray-400`}
                            />
                            <AiOutlineSearch
                                size={15}
                                className="absolute right-2 top-[4px]  text-gray-400"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { }}
                                title="Import"
                                className=" text-white text-[9px] text-center px-[1rem] py-[0.2rem]  rounded-md shadow-lg bg-gray-700 hover:bg-gray-900 transition duration-300"
                            >
                                Upload Data
                            </button>

                            <button
                                onClick={() => { }}
                                className=" text-white text-center px-[1rem] py-[0.2rem]  rounded-md bg-gray-700 hover:bg-gray-800 transition duration-300"
                                title="Export"
                            >
                                <PiExportBold />
                            </button>
                        </div>
                    </div>
                    <div className="max-h-[74vh] overflow-y-scroll">
                        <table className="table-auto w-full bg-white text-[11px] ">
                            <thead className="sticky -top-1 bg-gray-100 ">
                                <tr className=" bg-gray-100">
                                    <th className="border border-gray-200 text-left px-4 ">ID</th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Loan Key
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">

                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Agreement Amount
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Grace Period
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Repayment Principal
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Repayment Interest
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Repayment Type
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Repayment Bank
                                    </th>
                                    <th className="border border-gray-200 text-left px-4 ">
                                        Exchange Rate
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <td className="text-center text-[11px] text-red-600" colSpan={10}>
                                    No data found
                                   </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*  {dataMapped && dataMapped.length > 0 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={parseInt(pageCount)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )} */}

            </div>
        </>
    );
};

export default DebtList;
