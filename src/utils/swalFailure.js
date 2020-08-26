const { default: Swal } = require('sweetalert2');

export default function swallFailure(error) {
  console.log(error);
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: error,
  });
}
