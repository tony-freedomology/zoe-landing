export type SignupStatus = "idle" | "submitting" | "admitted" | "waitlisted" | "follow_up_required";

export function signupStatus(admissionStatus: unknown): SignupStatus {
  if (admissionStatus === "claimed") return "admitted";
  if (admissionStatus === "waitlisted") return "waitlisted";
  return "follow_up_required";
}

export function signupConfirmation(status: SignupStatus) {
  if (status === "admitted") return {
    title: "Your beta setup is queued.",
    body: "Zoe will text you during daytime hours so you can start. There’s nothing to download.",
  };
  if (status === "waitlisted") return {
    title: "You’re on the list!",
    body: "We’re inviting people in small groups while we improve Zoe. We’ll text you when your spot is ready. No need to sign up again.",
  };
  return {
    title: "We got your details.",
    body: "Your signup is saved. We’ll follow up with the next step for beta access. No need to sign up again.",
  };
}
