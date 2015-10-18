<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\LaravelJqueryValidation\Http\Controllers;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

/**
 * This is the AjaxValidationController.
 *
 * @package        Radic\LaravelJqueryValidation
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class AjaxValidationController extends Controller
{
    /**
     * @var \Illuminate\Contracts\Validation\Factory|\Illuminate\Validation\Factory
     */
    protected $validationFactory;

    /**
     * @var \Illuminate\Contracts\Routing\ResponseFactory
     */
    protected $responseFactory;

    /**
     * AjaxValidationController constructor.
     *
     * @param \Illuminate\Contracts\Validation\Factory      $validationFactory
     * @param \Illuminate\Contracts\Routing\ResponseFactory $responseFactory
     */
    public function __construct(ValidationFactory $validationFactory, ResponseFactory $responseFactory)
    {
        $this->validationFactory = $validationFactory;
        $this->responseFactory = $responseFactory;
    }

    /**
     * validate
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function validate(Request $request)
    {
        $validator = $this->validationFactory->make(
            $request->get('data'),
            $request->get('rules'),
            $request->get('messages', [])
        );

        $response = $this->createValidationResponse($validator);
        return $response;
    }

    /**
     * createValidationResponse
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createValidationResponse(Validator $validator)
    {
        $response = [
            'valid' => ! $validator->fails(),
            'errors' => $validator->getMessageBag()->toArray()
        ];
        return $this->responseFactory->json($response);
    }
}
