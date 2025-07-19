import {describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils'
import RegisterForm from '@/components/RegisterForm.vue';
import { createPinia, setActivePinia } from 'pinia';


const mockRegister = vi.fn()
const mockPush = vi.fn()

vi.mock('@/stores/auth', () => ({
    useAuthStore: () => ({
        register: mockRegister,
        error: null
    })
}))

vi.mock('#app', () => ({
    useRouter: () => ({
        push: mockPush
    })
}))

const fillForm = async (wrapper: any, data: any) => {
  await wrapper.find('#username').setValue(data.username)
  await wrapper.find('#email').setValue(data.email)
  await wrapper.find('#password').setValue(data.password)
  await wrapper.find('#confirm_password').setValue(data.confirmPassword)
}

describe('RegisterForm', () => {
    beforeEach(() => {
        mockRegister.mockReset()
        mockPush.mockReset()

        const pinia = createPinia()
        setActivePinia(pinia)
    }) 



    it('verifier si username est trop court', async () => {
        const wrapper = mount(RegisterForm, {
            global: {
                plugins: [createPinia()]
            }
        })

        await fillForm(wrapper, {
            username: 'si',
            email: 'test@example.com',
            password: 'password',
            confirmPassword: 'password'
        })
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.text()).toContain("Le nom d'utilisateur doit comporter entre 3 et 15 caractères.")
    })

    it('verifier si username est trop long', async () => {
        const wrapper = mount(RegisterForm, {
            global: {
                plugins: [createPinia()]
            }
        })

        await fillForm(wrapper, {
            username: 'si'.repeat(20),
            email: 'test@example.com',
            password: 'password',
            confirmPassword: 'password'
        })
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.text()).toContain("Le nom d'utilisateur doit comporter entre 3 et 15 caractères.")
    })

    it('verifier si email vide', async () => {
        const wrapper = mount(RegisterForm, {
            global: {
                plugins: [createPinia()]
            }
        })

        await fillForm(wrapper, {
            username: 'username',
            email: '',
            password: 'password',
            confirmPassword: 'password'
        })
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.text()).toContain("L'email est invalide")
    })




        it('verifier si le mot de passe est trop court', async () => {
        const wrapper = mount(RegisterForm, {
            global: {
                plugins: [createPinia()]
            }
        })

        await fillForm(wrapper, {
            username: 'username',
            email: 'test@example.com',
            password: 'pass',
            confirmPassword: 'pass'
        })
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.text()).toContain("Le mot de passe doit comporter au moins 6 caractères.")
    })

        it('verifier si le mot de passe ne correpondent pas avec le confirmPassword', async () => {
        const wrapper = mount(RegisterForm, {
            global: {
                plugins: [createPinia()]
            }
        })

        await fillForm(wrapper, {
            username: 'username',
            email: 'test@example.com',
            password: 'password',
            confirmPassword: 'password12'
        })
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.text()).toContain("Les mots de passe ne correspondent pas")
    })




})