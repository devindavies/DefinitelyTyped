// Type definitions for react-stripe-elements 6.0
// Project: https://github.com/stripe/react-stripe-elements#readme
// Definitions by: dan-j <https://github.com/dan-j>
//                 Santiago Doldan <https://github.com/santiagodoldan>
//                 sonnysangha <https://github.com/sonnysangha>
//                 Andrew Goh Yisheng <https://github.com/9y5>
//                 Thomas Chia <https://github.com/thchia>
//                 Piotr Dabrowski <https://github.com/yhnavein>
//                 Victor Irzak <https://github.com/virzak>
//                 Alex Price <https://github.com/remotealex>
//                 Maciej Dabek <https://github.com/bombek92>
//                 Hiroshi Ioka <https://github.com/hirochachacha>
//                 Devin Davies <https://github.com/devindavies>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/// <reference types="stripe-v3" />
import * as React from 'react';

export namespace ReactStripeElements {
    type ElementChangeResponse = stripe.elements.ElementChangeResponse;
    type ElementsOptions = stripe.elements.ElementsOptions;
    // From https://stripe.com/docs/stripe-js/reference#element-types
    type TokenType = 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc' | 'paymentRequestButton' | 'iban' | 'idealBank';
    type TokenOptions = stripe.TokenOptions & { type?: TokenType };
    type TokenResponse = stripe.TokenResponse;
    type SourceResponse = stripe.SourceResponse;
    type SourceOptions = stripe.SourceOptions;
    type HTMLStripeElement = stripe.elements.Element;

    /**
     * There's a bug in @types/stripe which defines the property as
     * `declined_code` (with a 'd') but it's in fact `decline_code`
     */
    type PatchedTokenResponse = TokenResponse & {
        error?: { decline_code?: string };
    };

    interface StripeProviderOptions {
        stripeAccount?: string;
    }
    type StripeProviderProps =
        | ({ apiKey: string; stripe?: never } & StripeProviderOptions)
        | ({ apiKey?: never; stripe: stripe.Stripe | null } & StripeProviderOptions);

    interface StripeProps {
        createSource(sourceData?: SourceOptions): Promise<SourceResponse>;
        createToken(options?: TokenOptions): Promise<PatchedTokenResponse>;
        paymentRequest: stripe.Stripe['paymentRequest'];
        createPaymentMethod(
            paymentMethodType: stripe.paymentMethod.paymentMethodType,
            data?: stripe.CreatePaymentMethodOptions,
        ): Promise<stripe.PaymentMethodResponse>;
        confirmCardPayment(
            clientSecret: string,
            data?: stripe.ConfirmCardPaymentData,
            options?: stripe.ConfirmCardPaymentOptions,
        ): Promise<stripe.PaymentIntentResponse>;
        handleCardPayment(
            clientSecret: string,
            options?: stripe.HandleCardPaymentWithoutElementsOptions,
        ): Promise<stripe.PaymentIntentResponse>;
        handleCardSetup(
            clientSecret: string,
            data?: stripe.HandleCardSetupOptions,
        ): Promise<stripe.SetupIntentResponse>;
    }

    interface InjectOptions {
        withRef?: boolean;
    }

    interface InjectedStripeProps {
        stripe: StripeProps | null;
        elements: stripe.elements.Elements | null;
    }

    interface ElementProps extends ElementsOptions {
        id?: string;

        className?: string;

        elementRef?(ref: any): void;

        onChange?(event: ElementChangeResponse): void;

        onBlur?(event: ElementChangeResponse): void;

        onFocus?(event: ElementChangeResponse): void;

        onReady?(el: HTMLStripeElement): void;
    }

    interface PaymentRequestButtonElementProps extends ElementProps {
        onClick?(event: any): void;
    }
}

export class StripeProvider extends React.Component<ReactStripeElements.StripeProviderProps> {}

export class Elements extends React.Component<stripe.elements.ElementsCreateOptions> {}

export function injectStripe<P extends object>(
    WrappedComponent: React.ComponentType<P & ReactStripeElements.InjectedStripeProps>,
    componentOptions?: ReactStripeElements.InjectOptions,
): React.ComponentType<P>;

export class CardElement extends React.Component<ReactStripeElements.ElementProps> {}

export class CardNumberElement extends React.Component<ReactStripeElements.ElementProps> {}

export class CardExpiryElement extends React.Component<ReactStripeElements.ElementProps> {}

export class CardCvcElement extends React.Component<ReactStripeElements.ElementProps> {}

// Deprecated but aliased until react-stripe-elements v5
export class CardCVCElement extends CardCvcElement {}

export class PostalCodeElement extends React.Component<ReactStripeElements.ElementProps> {}

export class PaymentRequestButtonElement extends React.Component<
    ReactStripeElements.PaymentRequestButtonElementProps
> {}

export class IbanElement extends React.Component<ReactStripeElements.ElementProps> {}

export class IdealBankElement extends React.Component<ReactStripeElements.ElementProps> {}
