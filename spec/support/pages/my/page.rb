#-- copyright
# OpenProject is a project management system.
# Copyright (C) 2012-2018 the OpenProject Foundation (OPF)
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2017 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See docs/COPYRIGHT.rdoc for more details.
#++

require 'support/pages/page'

module Pages
  module My
    class Page < ::Pages::Page
      def path
        my_page_path
      end

      def add_row(row_number, before_or_after: :before)
        # open grid row menu
        find("grid-area-row-headers .grid--header:nth-of-type(#{row_number})").click

        label = if before_or_after == :before
                  I18n.t('js.label_add_row_before')
                else
                  I18n.t('js.label_add_row_after')
                end

        find('li .menu-item', text: label).click
      end

      def add_widget(row_number, column_number, name)
        area = find("#grid--area-#{row_number}-#{column_number}")
        area.hover
        area.find('.grid--widget-add').click

        within '.op-modal--portal' do
          expect(page)
            .to have_content(I18n.t('js.grid.add_modal.choose_widget'))

          page.find('.grid--addable-widget', text: name).click
        end
      end
    end
  end
end
