import { useToast } from 'primevue/usetoast'

export function useApiToast() {
  const toast = useToast()

  function showApiError(error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: error.message || 'Щось пішло не так',
      life: 3000,
      group: 'api',
    })
  }

  function showApiSuccess(message) {
    toast.add({
      severity: 'success',
      summary: 'Успішно!',
      detail: message || 'Операція пройшла успішно!',
      life: 3000,
      group: 'api',
    })
  }

  return { showApiError, showApiSuccess }
}
