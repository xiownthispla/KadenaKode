import { toast } from "react-toastify";
import { NEW_TX } from "../kda-wallet/constants/constants";
import TitleMessageRender from "./TitleMessageRender";

export const messageToastManager = (message) => {
  if (message.type == 'error') {
    toast.error(message.data);
  }
  else {
    toast(message.data);
  }
}

export const txToastManager = async (txData) => {
  console.log('txData');
  console.log(txData);
  if (!txData || Object.keys(txData).length === 0) {
    return;
  }

  if ('listenPromise' in txData) {
    const id = toast.loading(<TitleMessageRender title={`Waiting...`} message={`TX ID: ${reqKey}`}/>, { type: toast.TYPE.INFO });
    let result = await txData.listenPromise;

    if (result.status === "success") {
      toast.update(id, { render: <TitleMessageRender title={`Success`} message={`${reqKey}`}/>, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 });
    }
    else {
      toast.update(id, { render: <TitleMessageRender title="Error" message={`${result.result.error.message}`}/>, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
    }
  }
  else {
    if (txData.result.status === 'success') {
      toast.success(<TitleMessageRender title={`Success`} message={`${txData.result.data}`}/>);
    }
    else {
      toast.error(<TitleMessageRender title={`Error`} message={`${txData.result.error.message}`}/>)
    }
  }
}

