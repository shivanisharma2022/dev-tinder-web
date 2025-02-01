import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Error verifying premium status:", error);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const response = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { keyId, amount, currency, orderId, notes } = response.data || {};

      if (!keyId || !amount || !currency || !orderId) {
        throw new Error("Missing necessary fields from the response");
      }

      const options = {
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "Dev Tinder",
        description: "Lets connect to other developers",
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error opening Razorpay:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="m-10">
        {isUserPremium ? (
          <h1 className="text-center text-2xl font-bold">
            You are already a premium user
          </h1>
        ) : (
          <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
              <h1 className="font-bold text-3xl">Silver Membership</h1>
              <ul>
                <li>- Chat with other people</li>
                <li>- 100 connection requests per day</li>
                <li>- Blue Tick</li>
                <li>- 3 months</li>
              </ul>
              <button
                onClick={() => handleBuyClick("silver")}
                className="btn btn-secondary"
              >
                Buy Silver
              </button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
              <h1 className="font-bold text-3xl">Gold Membership</h1>
              <ul>
                <li>- Chat with other people</li>
                <li>- Infinite connection requests per day</li>
                <li>- Blue Tick</li>
                <li>- 6 months</li>
              </ul>
              <button
                onClick={() => handleBuyClick("gold")}
                className="btn btn-primary"
              >
                Buy Gold
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Premium;
