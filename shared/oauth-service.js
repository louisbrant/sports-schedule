import AuthService from "./auth-service";

const OAuthService = {
  handleOAuthResponse(response, provider, router) {
    const res = {
      token: response.accessToken,
      user: {
        provider: provider,
        fname: provider == "facebook" ? response.name : response?.Tt?.Bd,
      },
    };
    AuthService.setUserDataToLocalStorage(res);
    router.push("/");
  },
};

export default OAuthService;
