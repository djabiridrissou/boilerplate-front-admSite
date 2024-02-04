import { useEffect } from "react";
const Dashboard = () => {
    //const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
        };

        getData();
    }, []);

    return (
        <div className="fade-in">
            <h1 className="text-xl font-[500] mt-2">
                Welcome to Debt Management System!
            </h1>
        </div>
    );
};

export default Dashboard;
