import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/users/users";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { yellowSearch } from "../../utils/dataFunction";
interface User {
    userId: string;
    fullName: string;
    identifier: string;
    password: string;
    passwordToChange: string;
    role: string;
    connected: boolean;
}

const Users = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [dataList, setDataList] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = ({ selected: selectedPage }: { selected: number }) => {
        setPage(selectedPage);
    }

    useEffect(() => {
        const usersparams = { page: page, limit: limit, searchTerm: searchTerm };
        dispatch(getUsers(usersparams) as any).then((res: any) => {
            setDataList(res.payload.data);
            setTotalPages(res.payload.totalPages);
        })
    }, [page, limit, searchTerm]);

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

                                onChange={(e) => { setLimit(parseInt(e.target.value)) }}
                                className={`text-[0.8rem] px-[8px] py-[0.2rem] border border-gray-400 rounded-[0.25rem] shadow-md placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-gray-300 focus:border-gray-500`}
                            >
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <div className="flex relative w-[20%]">
                            <input
                                type="text"
                                name="search"
                                id="search"

                                onChange={(e) => { setSearchTerm(e.target.value) }}
                                autoFocus
                                placeholder="Search..."
                                className={`w-full text-[0.8rem] px-[0.75rem] py-[0.2rem] border border-gray-400 rounded-md shadow-md placeholder-[#8391a2] focus:ring-[0.2px] focus:ring-gray-300 focus:border-gray-400`}
                            />
                            <AiOutlineSearch
                                size={15}
                                className="absolute right-2 top-[4px]  text-gray-400"
                            />
                        </div>
                    </div>
                    <div className="max-h-[74vh] overflow-y-scroll">
                        <table className="table-auto w-full bg-white text-[11px] ">
                            <thead className="sticky -top-1 bg-gray-100 ">
                                <tr className=" bg-gray-100">
                                    <th className="border border-gray-200 text-left">ID</th>
                                    <th className="border border-gray-200 text-left ">
                                        Full Name
                                    </th>
                                    <th className="border border-gray-200 text-left">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList && dataList.length > 0 ? (
                                    dataList?.map((item, index): any => (
                                        <tr key={index}>
                                            <td className="border-y text-left ">{index + 1 + (page - 1) * limit}</td>
                                            <td className="border-y text-left truncate-25" title={item?.fullName}>{yellowSearch(item?.fullName, searchTerm)}</td>
                                            <td className={`border-y text-left truncate-25 ${item.connected ? 'text-green-500' : 'text-red-500'}`}>
                                                {item.connected ? 'Online' : 'Offline'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center text-[11px] text-red-600" colSpan={10}>
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {dataList && dataList.length > 0 && (
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                )}

            </div>
        </>
    );
};

export default Users;
