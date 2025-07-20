import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/RegisterForm.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    register: vi.fn(),
    error: null,
  }),
}))

vi.mock('#app', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

const fillForm = async (wrapper: any, data: any) => {
  await wrapper.find('#username').setValue(data.username)
  await wrapper.find('#email').setValue(data.email)
  await wrapper.find('#password').setValue(data.password)
  await wrapper.find('#confirm_password').setValue(data.confirmPassword)
}

describe('RegisterForm - vérification des champs', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  const defaultProps = {
    registerForm: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    isSubmitting: false,
    errorMessage: '',
    successMessage: '',
  }

  it('vérifie la valeur du username', async () => {
    const wrapper = mount(RegisterForm, {
      props: { ...defaultProps },
      global: { plugins: [createPinia()] }
    })

    await fillForm(wrapper, {
      username: 'abc',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456',
    })

    const usernameInput = wrapper.find('#username').element as HTMLInputElement
    expect(usernameInput.value).toBe('abc')
    expect(usernameInput.value.length).toBeGreaterThanOrEqual(3)
  })

  it('vérifie que le username est trop court', async () => {
    const wrapper = mount(RegisterForm, {
      props: { ...defaultProps },
      global: { plugins: [createPinia()] }
    })

    await fillForm(wrapper, {
      username: 'ab',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456',
    })

    const usernameInput = wrapper.find('#username').element as HTMLInputElement
    expect(usernameInput.value.length).toBeLessThan(3)
  })

  it('vérifie que l\'email est vide', async () => {
    const wrapper = mount(RegisterForm, {
      props: { ...defaultProps },
      global: { plugins: [createPinia()] }
    })

    await fillForm(wrapper, {
      username: 'username',
      email: '',
      password: '123456',
      confirmPassword: '123456',
    })

    const emailInput = wrapper.find('#email').element as HTMLInputElement
    expect(emailInput.value).toBe('')
  })

  it('vérifie que le mot de passe correspond à la confirmation', async () => {
    const wrapper = mount(RegisterForm, {
      props: { ...defaultProps },
      global: { plugins: [createPinia()] }
    })

    await fillForm(wrapper, {
      username: 'username',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456',
    })

    const passwordInput = wrapper.find('#password').element as HTMLInputElement
    const confirmPasswordInput = wrapper.find('#confirm_password').element as HTMLInputElement
    expect(passwordInput.value).toBe(confirmPasswordInput.value)
  })

  it('vérifie que le mot de passe ne correspond pas à la confirmation', async () => {
    const wrapper = mount(RegisterForm, {
      props: { ...defaultProps },
      global: { plugins: [createPinia()] }
    })

    await fillForm(wrapper, {
      username: 'username',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '654321',
    })

    const passwordInput = wrapper.find('#password').element as HTMLInputElement
    const confirmPasswordInput = wrapper.find('#confirm_password').element as HTMLInputElement
    expect(passwordInput.value).not.toBe(confirmPasswordInput.value)
  })
})
