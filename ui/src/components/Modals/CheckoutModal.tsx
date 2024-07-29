import { useEffect } from "react";
import BasicModal from "./Modal";

const CheckoutModal = (
  props: {
    openCheckout: boolean;
    setOpen: (arg0: boolean) => void; 
  }
) => {

  useEffect(() => {
    props.setOpen(false);
  }, [props.setOpen])

  return (
    <BasicModal
      open={props.openCheckout}
      handleClose={() => props.setOpen(false)}
      title='Proceed to checkout'
      body='These things are too expensive. Your card is asking for less stuff :) Click anywhere outside this modal to continue'
    />
  )
};

export default CheckoutModal;