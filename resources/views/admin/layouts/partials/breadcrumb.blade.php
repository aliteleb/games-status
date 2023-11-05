@php
    $segments = explode('/', trim(request()->getPathInfo(), '/'));

    // Filter out numeric values from the segments array
    $segments = array_filter($segments, function ($segment) {
        return !is_numeric($segment);
    });
@endphp

<div class="page-title breadcrumb-container mobile-webview-hide">
    <nav class="nav-breadcrumb" aria-label="breadcrumb">
        <ol class="breadcrumb">
            @foreach ($segments as $segment)
                <li class="breadcrumb-item @if($loop->last){{'active'}}@endif">

                    @if($loop->first)
                        <a href="#">
                            <i class="sicon-home"></i>
                    @endif

                    @lang('breadcrumb.'.$segment)

                    @if($loop->first) </a> @endif
                </li>
            @endforeach
        </ol>
    </nav>
</div>


{{--
<li class="breadcrumb-item home">
    <a href="#">
        <i class="sicon-home"></i>
        @lang('breadcrumb.home')
    </a>
</li>
--}}

