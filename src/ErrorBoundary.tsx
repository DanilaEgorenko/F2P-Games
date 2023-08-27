import { Result } from "antd";
import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error): {
        error: Error;
    } {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Ошибка: ", error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.error) {
            return <Result
                status="error"
                title="Ошибка"
                subTitle={this.state.error.message}
            />
        }
        return this.props.children;
    }
}

export default ErrorBoundary;