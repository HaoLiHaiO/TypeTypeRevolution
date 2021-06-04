let Play = new PlayModal();

export function PlayModal() {
  this.render = function () {
    let modal = document.getElementById('modal')
    modal.style.display = 'display'
    document.getElementById('close-modal')
  }
}