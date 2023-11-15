import { IncomingMessage, ServerResponse } from 'http';

declare interface PodiumAsset {
    readonly value: string;
    prefix?: boolean;
    toHTML(): string;
}

export class AssetCss
    implements
        Pick<
            HTMLLinkElement,
            'as' | 'disabled' | 'hreflang' | 'title' | 'media' | 'rel' | 'type'
        >,
        PodiumAsset
{
    constructor(options?: {
        as?: string | false | null;
        crossorigin?: string | null | boolean;
        disabled?: boolean | '' | null;
        hreflang?: string | false | null;
        title?: string | false | null;
        media?: string | false | null;
        rel?: string | false | null;
        type?: string | false | null;
        value: string | false | null;
        data?: Array<{ key: string; value: string }>;
        strategy?: "beforeInteractive" | "afterInteractive" | "lazy";
        scope?: "content" | "fallback" | "all";
    });

    as: string;
    crossorigin: string | null;
    disabled: boolean;
    hreflang: string;
    title: string;
    media: string;
    rel: string;
    type: string;
    readonly value: string;
    data?: Array<{ key: string; value: string }>;
    strategy?: "beforeInteractive" | "afterInteractive" | "lazy";
    scope?: "content" | "fallback" | "all";
    toHTML(): string;
    toJSON(): Record<string, any>;
    toJsxAttributes(): Record<string, any>;
}

export class AssetJs
    implements
        Pick<HTMLScriptElement, 'integrity' | 'async' | 'defer' | 'type'>,
        PodiumAsset
{
    constructor(options?: {
        crossorigin?: string | null | boolean;
        type?: string | null | false;
        integrity?: string | null | false;
        referrerpolicy?: string | null | false;
        nomodule?: boolean | null | '';
        async?: boolean | null | '';
        defer?: boolean | null | '';
        value: string | null;
        data?: Array<{ key: string; value: string }>;
        strategy?: "beforeInteractive" | "afterInteractive" | "lazy";
        scope?: "content" | "fallback" | "all";
    });

    crossorigin: string | null;
    type: string;
    integrity: string;
    referrerpolicy: string;
    nomodule: boolean;
    async: boolean;
    defer: boolean;
    prefix?: boolean;
    readonly value: string;
    data?: Array<{ key: string; value: string }>;
    strategy?: "beforeInteractive" | "afterInteractive" | "lazy";
    scope?: "content" | "fallback" | "all";
    toHTML(): string;
    toJSON(): Record<string, any>;
    toJsxAttributes(): Record<string, any>;
}

export class HttpIncoming<T = { [key: string]: unknown }> {
    constructor(request: IncomingMessage, response: ServerResponse, params?: T);

    development: boolean;

    readonly response: ServerResponse;

    readonly request: IncomingMessage;

    context: any;

    readonly params: T;

    proxy: boolean;

    name: string;

    view: any;

    readonly url: URL;

    css: Array<AssetCss>;

    js: Array<AssetJs>;

    toJSON(): {
        development: boolean;
        context: any;
        params: T;
        proxy: boolean;
        name: string;
        url: URL;
        css: Array<AssetCss>;
        js: Array<AssetJs>;
    };
}
