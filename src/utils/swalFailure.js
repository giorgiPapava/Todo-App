const { default: Swal } = require('sweetalert2');

export default function swallFailure(error) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: error,
  });
}
