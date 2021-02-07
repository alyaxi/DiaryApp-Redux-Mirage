import Swal, {SweetAlertIcon} from "sweetalert2"

export const showAlert = (titleText= "Something happened.", alerttype?: SweetAlertIcon): void => {
    Swal.fire({
        titleText,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Dismiss",
        icon: alerttype,
        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation',
        },
        hideClass: {
            popup: "",
            backdrop: "",
        }

    })
}