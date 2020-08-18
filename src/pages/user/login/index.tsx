// import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox, Modal, Button } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
interface LoginProps {
	dispatch: Dispatch;
	userAndlogin: StateType;
	submitting?: boolean;
	showModel: boolean;
	tipMsg: string;
}

const LoginMessage: React.FC<{
	content: string;
}> = ({ content }) => (
	<Alert
		style={{
			marginBottom: 24,
		}}
		message={content}
		type="error"
		showIcon
	/>
);

const Login: React.FC<LoginProps> = (props) => {
	const { userAndlogin = {}, submitting } = props;
	const { status, type: loginType } = userAndlogin;
	const [autoLogin, setAutoLogin] = useState(true);
	const [msgModel, setModel] = useState({ show: false, msg: '' });
	const [type, setType] = useState<string>('account');

	const handleSubmit = (values: LoginParamsType) => {
		const { dispatch } = props;
		dispatch({
			type: 'userAndlogin/login',
			payload: {
				...values,
				type,
			},
		});
	};

	return (
		<div className={styles.main}>
			<LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
				<Tab key="account" tab="账户密码登录">
					{status === 'error' && loginType === 'account' && !submitting && (
						<LoginMessage content="账户或密码错误（admin/ant.design）" />
					)}

					<UserName
						name="userName"
						placeholder="用户名: admin or user"
						rules={[
							{
								required: true,
								message: '请输入用户名!',
							},
						]}
					/>
					<Password
						name="password"
						placeholder="密码: ant.design"
						rules={[
							{
								required: true,
								message: '请输入密码！',
							},
						]}
					/>
				</Tab>
				{/* <Tab key="mobile" tab="手机号登录">
					{status === 'error' && loginType === 'mobile' && !submitting && (
						<LoginMessage content="验证码错误" />
					)}
					<Mobile
						name="mobile"
						placeholder="手机号"
						rules={[
							{
								required: true,
								message: '请输入手机号！',
							},
							{
								pattern: /^1\d{10}$/,
								message: '手机号格式错误！',
							},
						]}
					/>
					<Captcha
						name="captcha"
						placeholder="验证码"
						countDown={120}
						getCaptchaButtonText=""
						getCaptchaSecondText="秒"
						rules={[
							{
								required: true,
								message: '请输入验证码！',
							},
						]}
					/>
				</Tab> */}
				<div>
					<Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
						自动登录
					</Checkbox>
					<a
						style={{
							float: 'right',
						}}
						onClick={() => setModel({ show: true, msg: '请联系管理员重置您的密码' })}
					>
						忘记密码
					</a>
				</div>
				<Submit loading={submitting}>登录</Submit>
				<div className={styles.other}>
					{/* 其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} /> */}
					<a
						className={styles.register}
						onClick={() =>
							setModel({
								show: true,
								msg: '后台系统，不支持注册。请联系管理员开通账号',
							})
						}
					>
						注册账户
					</a>
				</div>
			</LoginFrom>
			<Modal
				title="系统提示"
				visible={msgModel.show}
				onCancel={() => setModel({ show: false, msg: '' })}
			>
				<p>{msgModel.msg}</p>
			</Modal>
		</div>
	);
};

export default connect(
	({
		userAndlogin,
		loading,
	}: {
		userAndlogin: StateType;
		loading: {
			effects: {
				[key: string]: boolean;
			};
		};
	}) => ({
		userAndlogin,
		submitting: loading.effects['userAndlogin/login'],
	}),
)(Login);
