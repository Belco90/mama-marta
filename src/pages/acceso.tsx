import { Container } from '@chakra-ui/react'
import { useSession } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/router'
import { type ComponentProps } from 'react'

import { useSupabaseClient } from '~/hooks/useSupabaseClient'
import { HOME_URL } from '~/lib/utils'

const ES_LOCALIZATION: NonNullable<
	ComponentProps<typeof Auth>['localization']
>['variables'] = {
	sign_in: {
		button_label: 'Acceder',
		email_label: 'Dirección de email',
		loading_button_label: 'Cargando...',
		password_label: 'Contraseña',
		email_input_placeholder: '',
		password_input_placeholder: '',
	},
}

const LoginPage = () => {
	const supabase = useSupabaseClient()
	const session = useSession()
	const router = useRouter()

	if (session) {
		void router.push(HOME_URL)
		return <div>REDIRECTING</div>
	}

	return (
		<Container maxWidth="container.sm">
			<Auth
				supabaseClient={supabase}
				redirectTo="/"
				appearance={{ theme: ThemeSupa }}
				providers={[]}
				showLinks={false}
				localization={{ variables: ES_LOCALIZATION }}
			/>
		</Container>
	)
}

export default LoginPage
