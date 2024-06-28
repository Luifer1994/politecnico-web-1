// src/stores/toastStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useToastStore = defineStore('toastStore', () => {
  const isToastActive = ref(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    isToastActive.value = true;
    if (type === 'success') {
      toast.success(message, {
        onClose: () => { isToastActive.value = false; }
      });
    } else {
      toast.error(message, {
        onClose: () => { isToastActive.value = false; }
      });
    }
  };

  return { isToastActive, showToast };
});
