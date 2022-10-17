import React from "react";
import { getCsrfToken } from "next-auth/react";
import {
  Text,
  Button,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function Login({ csrfToken }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Tabs className="w-96 p-5 border rounded-lg bg-white">
        <Text
          bgGradient="linear(to-l, #2b6cb0, #4299e1)"
          bgClip="text"
          fontSize="3xl"
          textAlign="center"
          className="py-8"
          fontWeight="extrabold"
        >
          Next Video App
        </Text>
        <TabList>
          <Tab>密码登录</Tab>
          <Tab>邮箱注册</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <form
              className="space-y-5"
              action="/api/auth/callback/credentials"
              method="POST"
            >
              <Input
                size="lg"
                type="hidden"
                name="csrfToken"
                value={csrfToken}
              />
              <div>
                <Input
                  size="lg"
                  name="email"
                  id="input-email-for-credentials-provider"
                  type="text"
                  placeholder="请输入邮箱"
                />
              </div>
              <div>
                <Input
                  size="lg"
                  name="password"
                  id="input-password-for-credentials-provider"
                  type="password"
                  placeholder="请输入密码"
                />
              </div>
              <Button
                colorScheme="blue"
                size="lg"
                className="w-full"
                type="submit"
              >
                登录
              </Button>
            </form>
            <div className="mt-5">
              <form action="/api/auth/signin/github" method="POST">
                <Input
                  size="lg"
                  type="hidden"
                  name="csrfToken"
                  value={csrfToken}
                />
                <Input size="lg" type="hidden" name="callbackUrl" value="/" />
                <Button size="lg" type="submit" className="button">
                  <svg
                    className="w-5 h-5"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span className="ml-2">GitHub 登录</span>
                </Button>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <form
              className="space-y-3"
              action="/api/auth/signin/email"
              method="POST"
            >
              <Input
                size="lg"
                type="hidden"
                name="csrfToken"
                value={csrfToken}
              />
              <div>
                <Input
                  size="lg"
                  id="input-email-for-email-provider"
                  autoFocus
                  type="email"
                  name="email"
                  placeholder="请输入邮箱"
                  required
                />
              </div>
              <Button
                colorScheme="blue"
                size="lg"
                className="w-full"
                type="submit"
              >
                注册
              </Button>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
