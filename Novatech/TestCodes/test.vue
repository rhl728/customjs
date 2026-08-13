<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Shipping Details</h2>
    
    <div v-if="isLoading" class="text-sm text-blue-600 mb-4 animate-pulse">
      Updating available deliveryMethodsFields...
    </div>

    <form @submit.prevent class="space-y-4">
      <template v-for="field in activeFields">
        <div class="flex flex-col">
          <label class="mb-1 font-semibold text-gray-700">
            {{ field.label }} <span v-if="field.is_required" class="text-red-500">*</span>
          </label>

          <select
            v-if="field.input_model === 'select'"
            v-model="deliveryMethodsFormData[field.code]"
            @change="handleFieldChange(field, deliveryMethodsFormData[field.code])"
            class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            :required="!!field.is_required"
          >
            <option value="" disabled>Select {{ field.label }}</option>
            <option v-for="opt in field.options" :key="opt.id" :value="opt.id">
              {{ opt.label }}
            </option>
          </select>

          <input
            v-else-if="field.input_model === 'text'"
            type="text"
            v-model="deliveryMethodsFormData[field.code]"
            @input="handleFieldChange(field, deliveryMethodsFormData[field.code])"
            class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            :required="!!field.is_required"
          />
        </div>
      </template>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ShippingForm',
  data() {
    return {
      deliveryMethodsFields: [],
      deliveryMethodsFormData: {}, // Holds key-value pairs of user input
      isLoading: false,
      basePayload: {
        client_id: 'a2f9a33d84074961b2368602ca9bf9b7',
        code: 'koombiyo-courier-service',
        type: 'shipping'
      }
    };
  },
  computed: {
    // Dynamically filters out hidden dependent deliveryMethodsFields
    activeFields() {
      return this.deliveryMethodsFields.filter(f => !f.dependent);
    }
  },
  mounted() {
    this.initForm();
  },
  methods: {
    async initForm() {
      const savedData = localStorage.getItem('shippingFormData');
      const savedFields = localStorage.getItem('shippingFieldsSchema');

      if (savedData && savedFields) {
        // Hydrate state from local storage if the user previously completed it
        this.deliveryMethodsFormData = JSON.parse(savedData);
        this.deliveryMethodsFields = JSON.parse(savedFields);
      } else {
        // Otherwise, clear partial saves and fetch initial schema
        localStorage.removeItem('shippingFormData');
        localStorage.removeItem('shippingFieldsSchema');
        await this.fetchFields('getShippingFields');
      }
    },

    async fetchFields(execCode) {
      this.isLoading = true;
      try {
        // Replace with your actual HTTP client (e.g., axios)
        const response = await fetch('/api/execute_service_function', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...this.basePayload, exec: execCode })
        });
        
        const newFields = await response.json();

        if (execCode === 'getShippingFields') {
          this.deliveryMethodsFields = newFields;
          // Pre-populate deliveryMethodsFormData to ensure Vue 2 reactivity tracks these keys
          newFields.forEach(f => {
            this.$set(this.deliveryMethodsFormData, f.code, f.default_value || '');
          });
        } else {
          // Merge logic for non-mutually exclusive deliveryMethodsFields.
          // This iterates through the current schema and overwrites ONLY the deliveryMethodsFields 
          // that were returned in the latest API call (e.g., expanding the CITY options).
          this.deliveryMethodsFields = this.deliveryMethodsFields.map(existingField => {
            const updatedField = newFields.find(nf => nf.code === existingField.code);
            
            if (updatedField) {
              // Ensure the deliveryMethodsFormData object tracks this key if it's new
              if (!(updatedField.code in this.deliveryMethodsFormData)) {
                this.$set(this.deliveryMethodsFormData, updatedField.code, updatedField.default_value || '');
              }
              return updatedField;
            }
            return existingField;
          });
        }
      } catch (error) {
        console.error('Failed to fetch shipping deliveryMethodsFields:', error);
      } finally {
        this.isLoading = false;
      }
    },

    handleFieldChange(field, value) {
      // v-model updates the value, but $set guarantees reactivity deep within the object
      this.$set(this.deliveryMethodsFormData, field.code, value);

      // If this field acts as a guardian, fetch its specific dependent schema
      if (field.exec) {
        this.fetchFields(field.exec);
      }

      this.validateAndSave();
    },

    validateAndSave() {
      // Only require validation on deliveryMethodsFields currently rendered on screen
      const visibleRequiredFields = this.activeFields.filter(f => f.is_required);
      
      const isComplete = visibleRequiredFields.every(f => {
        const val = this.deliveryMethodsFormData[f.code];
        return val !== undefined && val !== null && String(val).trim() !== '';
      });

      if (isComplete) {
        localStorage.setItem('shippingFormData', JSON.stringify(this.deliveryMethodsFormData));
        localStorage.setItem('shippingFieldsSchema', JSON.stringify(this.deliveryMethodsFields));
      } else {
        // If a required field is cleared, wipe the local storage so it resets on refresh
        localStorage.removeItem('shippingFormData');
      }
    }
  }
};
</script>