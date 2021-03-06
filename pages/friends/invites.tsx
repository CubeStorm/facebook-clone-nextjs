import { AuthLayout } from '@components/layouts/AuthLayout';
import { Friends } from '@components/pages/friends/Friends';

export default function InvitesPage() {
    return (
        <AuthLayout>
            <Friends type="Invites" />
        </AuthLayout>
    );
}
