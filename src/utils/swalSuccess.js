const { default: Swal } = require('sweetalert2')

export default function swallSuccess (title) {
  Swal.fire({
    position: 'center',
    padding: '2em',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
}
