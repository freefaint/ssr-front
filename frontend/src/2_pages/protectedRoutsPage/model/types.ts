export type ProfileResponse = {
	ref: string;
	type: string;
	files: undefined;
	payload: {
		status: 'success' | 'error';
		data: {
			userHuid: string;
			name: string;
			avatar: string | null;
			avatarPreview: string | null;
			company: string | null;
			department: string | null;
			office: string | null;
			manager: string | null;
			managerHuid: string | null;
			email: string | null;
			phone: string | null;
			description: string | null;
			otherPhone: string | null;
			ipPhone: string | null;
			otherIpPhone: string | null;
		};
	};
};

export type AllowedHuidResponse = {
	allowed: boolean;
};
