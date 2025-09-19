// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

// export const useFlutterwavePayment = () => {
//   const initiatePayment = (config: any, callback: (response: any) => void) => {
//     const handleFlutterPayment = useFlutterwave(config);

//     handleFlutterPayment({
//       callback: (response) => {
//         // Call the callback provided by the user
//         callback(response);
//         closePaymentModal(); // Close the modal after payment
//       },
//       onClose: () => {
//         // Optional: handle when the modal closes unexpectedly
//       },
//     });
//   };

//   return { initiatePayment };
// };

interface PaymentOptions {
  config: any;
  onSuccess: (response: any) => void;
  onClose?: () => void;
  onError?: (error: any) => void;
}

export const useFlutterwavePayment = () => {
  const initiatePayment = ({
    config,
    onSuccess,
    onClose,
    onError,
  }: PaymentOptions) => {
    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
      callback: (response) => {
        if (response.status === "successful") {
          onSuccess(response);
        } else if (response.status === "cancelled") {
          onError?.(new Error("Payment was cancelled by user"));
        } else {
          onError?.(new Error(`Payment failed: ${response.status}`));
        }
        closePaymentModal();
      },
      onClose: () => {
        onClose?.();
      },
    });
  };

  return { initiatePayment };
};
