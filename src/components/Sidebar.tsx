import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { TbReportMoney } from "react-icons/tb";
import { FcDataConfiguration } from "react-icons/fc";

const Menus = [
    {
        title: "Dashboard",
        icon: <RxDashboard />,
        route: "/debt-system",
        spacing: false,
    },

    {
        title: "Debts List",
        icon: <GiReceiveMoney />,
        route: "/debt-system/debt-list",
        spacing: false,
    },
    {
        title: "Waiting For Refund",
        icon: <GiPayMoney />,
        route: "#",
        spacing: false,
    },
    {
        title: "Reports",
        icon: <TbReportMoney />,
        submenu: true,
        submenuItems: [
            { title: "Uncollected Loan", route: "#" },
            { title: "Overpaid Loan", route: "#" },
            { title: "Payment Before Due Date Principal", route: "#" },
            { title: "Payment Before Due Date Interest", route: "#" },
            { title: "Unwarranted Debt Service", route: "#" },
            { title: "Unwarranted Principal Repayment", route: "#" },
            { title: "Unwarranted Interest Repayment", route: "#" },
        ],
        spacing: false,
    },
    {
        title: "Configuration",
        icon: <FcDataConfiguration />,
        submenu: true,
        submenuItems: [
            { title: "Update Exchange Rates", route: "#" },
            { title: "User management", route: "/debt-system/index-users" },
        ],
        spacing: false,
    },
];

const Sidebar = ({ open, setOpen }: any) => {
    // Use an array to keep track of the open/close state for each submenu
    const [submenuOpen, setSubmenuOpen] = useState(Array(Menus.length).fill(false));
    const navigate = useNavigate();
    const toggleSubmenu = (index: number) => {
        setSubmenuOpen((prevSubmenuOpen) => {
            const newSubmenuOpen = [...prevSubmenuOpen];
            newSubmenuOpen[index] = !newSubmenuOpen[index];
            return newSubmenuOpen;
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setOpen(false);
            }
        };

        // Initial check
        handleResize();

        // Listen for resize events
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleLogout = async () => {
       navigate("/");
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 bottom-0 z-50 bg-gray-800 h-screen p-5 pt-8 max-w-[200px] ${open ? " w-60" : "w-20"
                    } transition duration-500`}
            >
                {/* <div className="flex items-center -mt-4 justify-center">
                    <img
                        src="/images/cagd-logo.png"
                        className="w-[40px] h-[40px]"
                        alt=""
                    />
                </div> */}
                <BsArrowLeftShort
                    className={`bg-white text-dark-purple text-lg rounded-full absolute -right-2 top-6 border border-gray-900 cursor-pointer ${!open && "rotate-180"
                        }`}
                    onClick={() => setOpen(!open)}
                />

                <ul className="pt-10">
                    {Menus.map((menu, index) => (
                        <React.Fragment key={index}>
                            {menu.route ? (
                                <Link
                                    to={menu.route}
                                    className={`text-gray-300 text-sm flex items-center gap-x-3 hover:text-white hover:bg-gray-400 transition duration-300 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"
                                        }`}
                                >
                                    <span className="text-2xl block float-left">
                                        {menu.icon ? menu.icon : <RiDashboardFill />}
                                    </span>

                                    <span
                                        className={` text-xsm font-medium flex-1 transition duration-200 ${!open && "hidden"
                                            }`}
                                    >
                                        <span className="text-[11px]">{menu.title}</span>
                                    </span>
                                </Link>
                            ) : (
                                <li
                                    className={`text-gray-300 text-sm flex items-center gap-x-3 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"
                                        }`}
                                    onClick={() => toggleSubmenu(index)}
                                >
                                    <span className="text-2xl block float-left">
                                        {menu.icon ? menu.icon : <RiDashboardFill />}
                                    </span>

                                    <span
                                        className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"
                                            }`}
                                    >
                                        <span className="text-[11px]">{menu.title}</span>
                                    </span>
                                    {menu.submenu && open && (
                                        <BsChevronDown
                                            className={`${submenuOpen[index] && "rotate-180 transition-transform"
                                                }`}
                                        //   onClick={() => toggleSubmenu(index)}
                                        />
                                    )}
                                </li>
                            )}
                            {menu.submenu && submenuOpen[index] && open && (
                                <ul className="w-[90%] ml-[10%]">
                                    {menu.submenuItems.map((submenuItem, subIndex) => (
                                        <Link
                                            to={submenuItem.route}
                                            key={subIndex}
                                            className={`text-gray-300  text-sm flex items-center gap-x-3 cursor-pointer hover:text-white hover:bg-gray-400 transition duration-300 p-2 hover:bg-light-white rounded-md`}
                                        >
                                            <span className="text-[11px] block float-left">{submenuItem.title}</span>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </ul>

                <button
                    onClick={handleLogout}
                    className={`w-[70%] text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-400  transition duration-300 rounded-md mt-2 absolute bottom-2`}
                >
                    <span className="text-2xl block font-bold ">
                        <BiLogOut />
                    </span>
                    <span className={`font-medium  duration-200 ${!open && "hidden"}`}>
                        Logout
                    </span>
                </button>
            </div>
        </>
    );
};

export default Sidebar;
