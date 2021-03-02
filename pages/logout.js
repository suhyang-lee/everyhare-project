import { destroyCookie } from "nookies";
import wrapper from "store/configureStore";
import { END } from "redux-saga";

const Logout = () => {
  return <div>로그아웃처리중</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    destroyCookie(context, "refresh_token");

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Logout;
