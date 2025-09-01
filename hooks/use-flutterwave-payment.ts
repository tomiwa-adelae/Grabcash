import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export const useFlutterwavePayment = () => {
  const initiatePayment = (config: any, callback: (response: any) => void) => {
    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
      callback: (response) => {
        // Call the callback provided by the user
        callback(response);
        closePaymentModal(); // Close the modal after payment
      },
      onClose: () => {
        // Optional: handle when the modal closes unexpectedly
      },
    });
  };

  return { initiatePayment };
};
