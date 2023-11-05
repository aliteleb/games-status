<style>
    .sidebar-main{
        position: fixed;
        top: 50px;
        bottom: 0px;
    }
</style>
<div class="sidebar sidebar-main">
    <div class="sidebar-content">

        <div class="sidebar-user sidebar-user--team">
            <div class="media">
                <div class="media-left no-padding" id="store_avatar">
                    <div class="store-img-wrapper">
                        <img id="store_avatar_img" class="store-img img-circle img-sm" alt=""
                             src="{{ storage('media', settings('site_logo')) }}"/>
                    </div>
                    <div class="store-name-plan">
                        <h6 class="store-name-side font-regular">
                            {{ settings('site_title') }}
                        </h6>

                        <div>
                            <div class="store-link dropdown">
                                <a href="{{ config('app.url') }}"
                                   target="_blank" class="btn visit-store">
                                   @lang('sidebar.visit_site')
                                    <i class="sicon-keyboard_arrow_left"></i>
                                </a>

                           </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="sidebar-category sidebar-category-visible">
            <div class="category-content no-padding">
                <ul class="navigation navigation-main navigation-accordion">

                    <li>
                        <a href="{{route('admin.dashboard')}}"><i class="sicon-home"></i>
                            <span> @lang('sidebar.home')</span>
                        </a>
                    </li>

                    {{--
                    <li>
                        <a href="{{route('admin.posts.index')}}">
                            <i class="sicon-survey"></i>
                            <span>@lang('sidebar.posts')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.categories.index')}}">
                            <i class="sicon-border-all"></i>
                            <span>@lang('sidebar.categories')</span>
                        </a>
                    </li>
                    --}}

                    <li>
                        <a href="{{route('admin.media.index')}}">
                            <i class="sicon-film-strip"></i>
                            <span>@lang('sidebar.media')</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="sicon-graph-bar"></i>
                            <span>@lang('sidebar.reports')</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="sicon-chat-conversation-alt"></i>
                            <span>@lang('sidebar.comments')</span>
                            <span class='badge bg-danger' id='feedback_badge'>2</span>
                        </a>
                    </li>

                    <li class="navigation-header">
                        <span>@lang('sidebar.users')</span>
                    </li>
                    <li>
                        <a href="{{route('admin.users.index')}}">
                            <i class="sicon-users"></i>
                            <span>@lang('sidebar.users_menu')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.roles.index')}}">
                            <i class="sicon-padlock-unlock"></i>
                            <span>@lang('sidebar.roles')</span>
                            <span class="badge badge--primary">@lang('ui.new')</span>
                        </a>
                    </li>

                    <li class="navigation-header"><span>@lang('sidebar.settings')</span></li>

                    <li>
                        <a href="{{route('admin.settings.index')}}">
                            <i class="sicon-settings"></i>
                            <span>@lang('sidebar.website_settings')</span>
                        </a>
                    </li>


                </ul>
            </div>
        </div>

    </div>
</div>

<style>
    .sidebar .navigation li a[href='{{request()->url()}}'] {
        color: white;
        background-color: #336B87;
    }
    .sidebar .navigation li a[href='{{request()->url()}}']:hover {
        color: white;
        background-color: #336B87;
    }
</style>
