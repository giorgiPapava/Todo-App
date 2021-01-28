const { default: Swal } = require('sweetalert2')

export default function swalConfirm (type, successFunction, ...successParams) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    width: '40em',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      successFunction(...successParams)
        .then(
          Swal.fire('Deleted!', `Your ${type} has been deleted.`, 'success')
        )
        .catch((error) =>
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: error
          })
        )
      // yes function
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire('Cancelled', `Your ${type} is safe :)`, 'error')
    }
  })
}
