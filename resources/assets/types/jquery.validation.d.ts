// Type definitions for jquery.validation 1.13.1
// Project: http://jqueryvalidation.org/
// Definitions by: François de Campredon <https://github.com/fdecampredon>, John Reilly <https://github.com/johnnyreilly>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare type JQueryValidationRulesDictionary = { [name: string]: any };

declare type JQueryValidationShouldValidatePredicate = boolean|((element:HTMLElement, event:JQueryEventObject) => void);

interface JQueryValidationOptions {
    /**
     * Enables debug mode. If true, the form is not submitted and certain errors are displayed on the console (will check if a window.console property exists). Try to enable when a form is just submitted instead of validation stopping the submit.
     *
     * default: false
     */
    debug?: boolean;
    /**
     * Use this class to create error labels, to look for existing error labels and to add it to invalid elements.
     *
     * default: "error"
     */
    errorClass?: string;
    /**
     * Hide and show this container when validating.
     */
    errorContainer?: string;
    /**
     * Use this element type to create error messages and to look for existing error messages. The default, "label", has the advantage of creating a meaningful link between error message and invalid field using the for attribute (which is always used, regardless of element type).
     *
     * default: "label"
     */
    errorElement?: string;
    /**
     * Hide and show this container when validating. (eg "#messageBox")
     */
    errorLabelContainer?: string;
    /**
     * Customize placement of created error labels. First argument: The created error label as a jQuery object. Second argument: The invalid element as a jQuery object.
     *
     * default: Places the error label after the invalid element
     */
    errorPlacement?: (error:JQuery, element:JQuery) => void;
    /**
     * If enabled, removes the errorClass from the invalid elements and hides all error messages whenever the element is focused. Avoid combination with focusInvalid.
     *
     * default: false
     */
    focusCleanup?: boolean;
    /**
     * Focus the last active or first invalid element on submit via validator.focusInvalid(). The last active element is the one that had focus when the form was submitted, avoiding stealing its focus. If there was no element focused, the first one in the form gets it, unless this option is turned off.
     *
     * default: true
     */
    focusInvalid?: boolean;
    /**
     * Specify grouping of error messages. A group consists of an arbitrary group name as the key and a space separated list of element names as the value. Use errorPlacement to control where the group message is placed.
     */
    groups?: { [groupName: string]: string };
    /**
     * How to highlight invalid fields. Override to decide which fields and how to highlight.
     *
     * default: Adds errorClass (see the option) to the element
     */
    highlight?: (element:HTMLElement, errorClass:string, validClass:string) => void;
    /**
     * Elements to ignore when validating, simply filtering them out. jQuery's not-method is used, therefore everything that is accepted by not() can be passed as this option. Inputs of type submit and reset are always ignored, so are disabled elements.
     */
    ignore?: string;
    /**
     * Set to skip reading messages from the title attribute, helps to avoid issues with Google Toolbar; default is false for compability, the message-from-title is likely to be completely removed in a future release.
     *
     * default: false
     */
    ignoreTitle?: boolean;
    /**
     * Callback for custom code when an invalid form is submitted. Called with an event object as the first argument, and the validator as the second.
     */
    invalidHandler?: (event:JQueryEventObject, validator:JQueryValidationValidator) => void;
    /**
     * Key/value pairs defining custom messages. Key is the name of an element, value the message to display for that element. Instead of a plain message, another map with specific messages for each rule can be used. Overrides the title attribute of an element or the default message for the method (in that order). Each message can be a String or a Callback. The callback is called in the scope of the validator, with the rule's parameters as the first argument and the element as the second, and must return a String to display as the message.
     *
     * default: the default message for the method used
     */
    messages?: Object;
    meta?: string;
    /**
     * Boolean or Function. Validate checkboxes and radio buttons on click. Set to false to disable.
     *
     * Set to a Function to decide for yourself when to run validation.
     * A boolean true is not a valid value.
     */
    onclick?: JQueryValidationShouldValidatePredicate;
    /**
     * Boolean or Function. Validate elements (except checkboxes/radio buttons) on blur. If nothing is entered, all rules are skipped, except when the field was already marked as invalid.
     *
     * Set to a Function to decide for yourself when to run validation.
     * A boolean true is not a valid value.
     */
    onfocusout?: JQueryValidationShouldValidatePredicate;
    /**
     * Boolean or Function. Validate elements on keyup. As long as the field is not marked as invalid, nothing happens. Otherwise, all rules are checked on each key up event. Set to false to disable.
     *
     * Set to a Function to decide for yourself when to run validation.
     * A boolean true is not a valid value.
     */
    onkeyup?: JQueryValidationShouldValidatePredicate;
    /**
     * Validate the form on submit. Set to false to use only other events for validation.
     * Set to a Function to decide for yourself when to run validation.
     * A boolean true is not a valid value.
     *
     * default: true
     */
    onsubmit?: boolean;
    /**
     * A custom message display handler. Gets the map of errors as the first argument and an array of errors as the second, called in the context of the validator object. The arguments contain only those elements currently validated, which can be a single element when doing validation onblur/keyup. You can trigger (in addition to your own messages) the default behaviour by calling this.defaultShowErrors().
     */
    rules?: JQueryValidationRulesDictionary;
    /**
     * A custom message display handler. Gets the map of errors as the first argument and an array of errors as the second, called in the context of the validator object. The arguments contain only those elements currently validated, which can be a single element when doing validation onblur/keyup. You can trigger (in addition to your own messages) the default behaviour by calling this.defaultShowErrors().
     */
    showErrors?: (errorMap:JQueryValidationErrorDictionary, errorList:JQueryValidationErrorListItem[]) => void;
    /**
     * Callback for handling the actual submit when the form is valid. Gets the form as the only argument. Replaces the default submit. The right place to submit a form via Ajax after it is validated.
     */
    submitHandler?: (form:HTMLFormElement) => void;
    /**
     * String or Function. If specified, the error label is displayed to show a valid element. If a String is given, it is added as a class to the label. If a Function is given, it is called with the label (as a jQuery object) and the validated input (as a DOM element). The label can be used to add a text like "ok!".
     */
    success?: string|{($label:JQuery, validatedInput:HTMLElement):void};
    /**
     * Called to revert changes made by option highlight, same arguments as highlight.
     *
     * default: Removes the errorClass
     */
    unhighlight?: (element:HTMLElement, errorClass?:string, validClass?:string) => void;
    /**
     * This class is added to an element after it was validated and considered valid.
     *
     * default: "valid"
     */
    validClass?: string;
    /**
     * Wrap error labels with the specified element. Useful in combination with errorLabelContainer to create a list of error messages.
     *
     * default: window
     */
    wrapper?: string;
}

interface JQueryValidationValidatorStaticMethods {
    [name: string]: any;
    required(value:any, element?:HTMLElement, param?:any):boolean
    email(value:any, element?:HTMLElement, param?:any):boolean
    url(value:any, element?:HTMLElement, param?:any):boolean
    date(value:any, element?:HTMLElement, param?:any):boolean
    dateISO(value:any, element?:HTMLElement, param?:any):boolean
    number(value:any, element?:HTMLElement, param?:any):boolean
    digits(value:any, element?:HTMLElement, param?:any):boolean
    creditcard(value:any, element?:HTMLElement, param?:any):boolean
    minlength(value:any, element?:HTMLElement, param?:any):boolean
    maxlength(value:any, element?:HTMLElement, param?:any):boolean
    rangelength(value:any, element?:HTMLElement, param?:any):boolean
    min(value:any, element?:HTMLElement, param?:any):boolean
    max(value:any, element?:HTMLElement, param?:any):boolean
    range(value:any, element?:HTMLElement, param?:any):boolean
    equalTo(value:any, element?:HTMLElement, param?:any):boolean
    remote(value:any, element?:HTMLElement, param?:any):boolean
    maxWords(value:any, element?:HTMLElement, param?:any):boolean
    minWords(value:any, element?:HTMLElement, param?:any):boolean
    rangeWords(value:any, element?:HTMLElement, param?:any):boolean
    accept(value:any, element?:HTMLElement, param?:any):boolean
    alphanumeric(value:any, element?:HTMLElement, param?:any):boolean
    bankaccountNL(value:any, element?:HTMLElement, param?:any):boolean
    bankorgiroaccountNL(value:any, element?:HTMLElement, param?:any):boolean
    bic(value:any, element?:HTMLElement, param?:any):boolean
    cifES(value:any, element?:HTMLElement, param?:any):boolean
    creditcardtypes(value:any, element?:HTMLElement, param?:any):boolean
    currency(value:any, element?:HTMLElement, param?:any):boolean
    dateFA(value:any, element?:HTMLElement, param?:any):boolean
    dateITA(value:any, element?:HTMLElement, param?:any):boolean
    dateNL(value:any, element?:HTMLElement, param?:any):boolean
    extension(value:any, element?:HTMLElement, param?:any):boolean
    giroaccountNL(value:any, element?:HTMLElement, param?:any):boolean
    iban(value:any, element?:HTMLElement, param?:any):boolean
    integer(value:any, element?:HTMLElement, param?:any):boolean
    ipv4(value:any, element?:HTMLElement, param?:any):boolean
    ipv6(value:any, element?:HTMLElement, param?:any):boolean
    lettersonly(value:any, element?:HTMLElement, param?:any):boolean
    letterswithbasicpunc(value:any, element?:HTMLElement, param?:any):boolean
    mobileNL(value:any, element?:HTMLElement, param?:any):boolean
    mobileUK(value:any, element?:HTMLElement, param?:any):boolean
    nieES(value:any, element?:HTMLElement, param?:any):boolean
    nifES(value:any, element?:HTMLElement, param?:any):boolean
    nowhitespace(value:any, element?:HTMLElement, param?:any):boolean
    pattern(value:any, element?:HTMLElement, param?:any):boolean
    phoneNL(value:any, element?:HTMLElement, param?:any):boolean
    phoneUK(value:any, element?:HTMLElement, param?:any):boolean
    phoneUS(value:any, element?:HTMLElement, param?:any):boolean
    phonesUK(value:any, element?:HTMLElement, param?:any):boolean
    postalCodeCA(value:any, element?:HTMLElement, param?:any):boolean
    postalcodeIT(value:any, element?:HTMLElement, param?:any):boolean
    postalcodeNL(value:any, element?:HTMLElement, param?:any):boolean
    postcodeUK(value:any, element?:HTMLElement, param?:any):boolean
    require_from_group(value:any, element?:HTMLElement, param?:any):boolean
    skip_or_fill_minimum(value:any, element?:HTMLElement, param?:any):boolean
    stateUS(value:any, element?:HTMLElement, param?:any):boolean
    strippedminlength(value:any, element?:HTMLElement, param?:any):boolean
    time(value:any, element?:HTMLElement, param?:any):boolean
    time12h(value:any, element?:HTMLElement, param?:any):boolean
    url2(value:any, element?:HTMLElement, param?:any):boolean
    vinUS(value:any, element?:HTMLElement, param?:any):boolean
    zipcodeUS(value:any, element?:HTMLElement, param?:any):boolean
    ziprange(value:any, element?:HTMLElement, param?:any):boolean
}

interface JQueryValidationErrorDictionary {
    [name: string]: string;
}

interface JQueryValidationErrorListItem {
    message: string;
    element: HTMLElement;
}

interface JQueryValidationValidatorStatic {

    /**
     * Add a compound class method - useful to refactor common combinations of rules into a single class.
     *
     * @param name The name of the class rule to add
     * @param rules The compound rules
     */
    addClassRules(name:string, rules:JQueryValidationRulesDictionary): void;
    /**
     * Add a compound class method - useful to refactor common combinations of rules into a single class.
     *
     * @param rules A map of className-rules pairs
     */
    addClassRules(rules:JQueryValidationRulesDictionary): void;
    /**
     * Add a custom validation method. It must consist of a name (must be a legal javascript identifier), a javascript based function and a default string message.
     *
     * @param name The name of the method used to identify it and referencing it; this must be a valid JavaScript identifier
     * @param method The actual method implementation, returning true if an element is valid. First argument: Current value. Second argument: Validated element. Third argument: Parameters.
     */
    addMethod(name:string, method:(value:any, element:HTMLElement, params:any) => boolean, message?:string): void;
    /**
     * Replaces {n} placeholders with arguments.
     *
     * @param template The string to format.
     */
    format(template:string): ( (...args:any[]) => string);
    format(template:string, ...args:any[]): string;
    /**
     * Modify default settings for validation.
     *
     * @param options Options to set as default.
     */
    setDefaults(defaults:JQueryValidationOptions): void;

    defaults: JQueryValidationOptions,
    messages: { [index: string]: string };
    methods: JQueryValidationValidatorStaticMethods,
    prototype: JQueryValidationValidator,
    normalizeRules( rules:any, element:any ):any;
    laravalRules(element:HTMLInputElement):any;
}

interface JQueryValidationValidator {
    init():void;
    currentForm?:HTMLFormElement;
    submitted?:any;
    element(element:string|JQuery): boolean;
    /**
     * Validates the form, returns true if it is valid, false otherwise.
     */
    form(): boolean;

    invalidElements(): HTMLElement[];

    /**
     * Returns the number of invalid fields.
     */
    numberOfInvalids(): number;
    /**
     * Resets the controlled form.
     */
    resetForm(): void;

    settings: JQueryValidationOptions;
    /**
     * Show the specified messages.
     *
     * @param errors One or more key/value pairs of input names and messages.
     */
    showErrors(errors:any): void;

    hideErrors(): void;

    valid(): boolean;
    validElements(): HTMLElement[];
    size(): number;
    focusInvalid(): void;
    errorMap: JQueryValidationErrorDictionary;
    errorList: JQueryValidationErrorListItem[];

    invalid:{[name:string]:boolean};
    pendingRequest?:number;
    pending?:any;
    errorContext?:JQuery;
    successList?:any[],
    currentElements?:JQuery;
    containers?:JQuery;


    checkForm():any ;
    showErrors(errors):any ;
    resetForm():any ;
    numberOfInvalids():any ;
    objectLength(obj):any ;
    hideErrors():any ;
    hideThese(errors):any ;
    valid():any ;
    size():any ;
    focusInvalid():any ;
    findLastActive():any ;
    elements():any ;
    clean(selector):any ;
    errors():any ;
    reset():any ;
    prepareForm():any ;
    prepareElement(element):any ;
    elementValue(element):any ;
    check(element):any ;
    customDataMessage(element, method):any ;
    customMessage(name, method):any ;
    findDefined():any ;
    defaultMessage(element, method):any ;
    formatAndAdd(element, rule):any ;
    addWrapper(toToggle):any ;
    defaultShowErrors():any ;
    validElements():any ;
    invalidElements():any ;
    showLabel(element, message?:any):any ;
    errorsFor(element):any ;
    idOrName(element):any ;
    validationTargetFor(element):any ;
    checkable(element):any ;
    findByName(name):JQuery ;
    getLength(value, element):any ;
    depend(param, element):any ;
    optional(element):any ;
    startRequest(element):any ;
    stopRequest(element, valid):any ;
    previousValue(element):any;
}


interface JQuery {
    /**
     * Remove the specified attributes from the first matched element and return them.
     *
     * @param attributes A space-separated list of attribute names to remove.
     */
    removeAttrs(attributes:string): any;

    /**
     * Returns the validations rules for the first selected element
     */
    rules(): any;

    /**
     * Removes the specified rules and returns all rules for the first matched element.
     *
     * @param command "remove"
     * @param rules Removes and returns all rules. Manipulates only rules specified via rules-option or via rules("add").
     */
    rules(command:string): any;
    /**
     * Removes the specified rules and returns all rules for the first matched element.
     *
     * @param command "remove"
     * @param rules The space-separated names of rules to remove and return. Manipulates only rules specified via rules-option or via rules("add").
     */
    rules(command:string, rules:string): any;
    /**
     * Adds the specified rules and returns all rules for the first matched element. Requires that the parent form is validated, that is, $("form").validate() is called first
     *
     * @param command "add"
     * @param rules The rules to add. Accepts the same format as the rules-option of the validate-method.
     */
    rules(command:string, rules:JQueryValidationRulesDictionary): any;

    /**
     * Checks whether the selected form is valid or whether all selected elements are valid.
     */
    valid(): boolean;

    /**
     * Validates the selected form.
     *
     * @param options options for validation
     */
    validate(options?:JQueryValidationOptions): JQueryValidationValidator;
}

interface JQueryStatic {
    /**
     * Replaces {n} placeholders with arguments.
     *
     * @param template The string to format.
     */
    format(template:string, ...arguments:string[]): string;

    validator: JQueryValidationValidatorStatic;
}
