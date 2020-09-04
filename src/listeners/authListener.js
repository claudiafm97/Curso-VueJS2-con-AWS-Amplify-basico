import { Hub, Logger } from "aws-amplify";
import store from "../store";
import router from "../router";

const logger = new Logger("auth_watcher");

const listener = (capsule) => {
  switch (capsule.payload.event) {
    case "signIn":
      store.commit("auth/setUser", capsule.payload.data, { root: true });
      router.push("/todos");
      logger.info("user signed in");
      break;
    case "signUp":
      logger.info("user signed up");
      break;
    case "signOut":
      store.commit("auth/setUser", null, { root: true });
      router.push("/authentication");
      logger.info("user signed out");
      break;
    case "signIn_failure":
      logger.info("user sign in failed");
      break;
    case "configured":
      logger.info("the Auth module is configured");
  }
};

Hub.listen("auth", listener);
