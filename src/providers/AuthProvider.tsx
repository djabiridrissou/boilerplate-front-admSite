import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurentUser } from "../redux/auth/auth";
import Loading from "../components/Loading";

function AuthProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCurentUser() as any).unwrap().then((res: any) => {
          if (!res) {
            navigate("/");
          }
          setIsLoading(false);
        }).catch((error: any) => {
          console.log(error);
        });
        // eslint-disable-next-line
      }, []);
      


    return (
        <Loading isLoading={isLoading} children={children} />
    );
}

export default AuthProvider;