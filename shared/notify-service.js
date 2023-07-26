import { toast } from "react-toastify";

const NotifyService = {
    success: (msg) => toast.success(msg),
    fail: (msg) => toast.error(msg),
}

export default NotifyService